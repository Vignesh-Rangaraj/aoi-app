import { MapContainer, TileLayer, Polygon, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Aoi, LatLng } from "../../types/aoi";
import { useEffect, useRef } from "react";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface AoiMapProps {
  center: LatLng;
  aois: Aoi[];
  selectedAoiId: string | null;
  drawingMode: boolean;
  tempVertices: LatLng[];
  onTempVerticesChange: (vertices: LatLng[]) => void;
  onPolygonFinished: (vertices: LatLng[]) => void;
}

const DrawingLayer = ({
  drawingMode,
  onTempVerticesChange,
  onPolygonFinished,
}: {
  drawingMode: boolean;
  onTempVerticesChange: (v: LatLng[]) => void;
  onPolygonFinished: (v: LatLng[]) => void;
}) => {
  // ⬇⬇ THE FIX ⬇⬇
  const verticesRef = useRef<LatLng[]>([]).current;

  useMapEvents({
    click(e) {
      if (!drawingMode) return;
      const point = { lat: e.latlng.lat, lng: e.latlng.lng };
      verticesRef.push(point);
      onTempVerticesChange([...verticesRef]);
    },
    dblclick() {
      if (!drawingMode) return;

      if (verticesRef.length >= 3) {
        onPolygonFinished([...verticesRef]);
      }
      verticesRef.length = 0;
      onTempVerticesChange([]);
    },
  });

  return null;
};


const AoiMap = ({
  center,
  aois,
  selectedAoiId,
  drawingMode,
  tempVertices,
  onTempVerticesChange,
  onPolygonFinished,
}: AoiMapProps) => {
  // Disable default double-click zoom when drawing
  useEffect(() => {
    // nothing required here because we pass doubleClickZoom={false}
  }, []);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={12}
      className="w-full h-full"
      doubleClickZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {aois.map((aoi) => (
        <Polygon
          key={aoi.id}
          positions={aoi.vertices.map((v) => [v.lat, v.lng])}
          pathOptions={{
            color: "#f5d29b",
            weight: selectedAoiId === aoi.id ? 4 : 2,
          }}
        />
      ))}

      {drawingMode && tempVertices.length > 0 && (
        <Polyline
          positions={tempVertices.map((v) => [v.lat, v.lng])}
          pathOptions={{ dashArray: "5 5" }}
        />
      )}

      <DrawingLayer
        drawingMode={drawingMode}
        onTempVerticesChange={onTempVerticesChange}
        onPolygonFinished={onPolygonFinished}
      />
    </MapContainer>
  );
};

export default AoiMap;
