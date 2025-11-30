// src/layout/AppLayout.tsx
import { useMemo, useState } from "react";
import type { Aoi, LatLng } from "../types/aoi";
import ScopeSidebar from "../components/aoi/ScopeSidebar";
import AoiMap from "../components/Map/AoiMap";
import Toast from "../components/common/Toast";
import Modal from "../components/common/Modal";

const INITIAL_CENTER: LatLng = { lat: 50.94, lng: 6.96 }; // Cologne-ish

// Simple city presets to mimic the Figma flow
export interface CityPreset {
  id: string;
  label: string;
  center: LatLng;
  polygon: LatLng[];
}

const CITY_PRESETS: CityPreset[] = [
  {
    id: "cologne-city",
    label: "Cologne – City Proper",
    center: { lat: 50.94, lng: 6.96 },
    polygon: [
      { lat: 50.958, lng: 6.93 },
      { lat: 50.958, lng: 6.99 },
      { lat: 50.922, lng: 6.99 },
      { lat: 50.922, lng: 6.93 },
    ],
  },
  {
    id: "cologne-inner",
    label: "Cologne – Inner City / Downtown",
    center: { lat: 50.94, lng: 6.95 },
    polygon: [
      { lat: 50.952, lng: 6.93 },
      { lat: 50.952, lng: 6.97 },
      { lat: 50.928, lng: 6.97 },
      { lat: 50.928, lng: 6.93 },
    ],
  },
  {
    id: "cologne-metro",
    label: "Cologne – Metropolitan Area",
    center: { lat: 50.94, lng: 6.9 },
    polygon: [
      { lat: 50.98, lng: 6.85 },
      { lat: 50.98, lng: 6.99 },
      { lat: 50.9, lng: 6.99 },
      { lat: 50.9, lng: 6.85 },
    ],
  },
  {
    id: "cologne-suburb",
    label: "Cologne – Suburbs / Periphery",
    center: { lat: 50.92, lng: 7.0 },
    polygon: [
      { lat: 50.94, lng: 6.96 },
      { lat: 50.96, lng: 7.02 },
      { lat: 50.9, lng: 7.02 },
      { lat: 50.88, lng: 6.96 },
    ],
  },
];

const AppLayout = () => {
  const [aois, setAois] = useState<Aoi[]>([]);
  const [selectedAoiId, setSelectedAoiId] = useState<string | null>(null);

  const [drawingMode, setDrawingMode] = useState(false);
  const [tempVertices, setTempVertices] = useState<LatLng[]>([]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scopeFinished, setScopeFinished] = useState(false);

  const [mapCenter] = useState<LatLng>(INITIAL_CENTER);

  const visibleAois = useMemo(
    () => aois.filter((a) => a.visible),
    [aois]
  );

  const handleNewPolygon = (vertices: LatLng[]) => {
    const id = crypto.randomUUID();
    const newAoi: Aoi = {
      id,
      name: `Area ${aois.length + 1}`,
      vertices,
      visible: true,
    };
    setAois((prev) => [...prev, newAoi]);
    setSelectedAoiId(id);
    setDrawingMode(false);
    setTempVertices([]);
    showToast("Areas created");
  };

  const handleApplyCityPreset = (preset: CityPreset) => {
    const id = crypto.randomUUID();
    const newAoi: Aoi = {
      id,
      name: `Area ${aois.length + 1}`,
      vertices: preset.polygon,
      visible: true,
    };
    setAois((prev) => [...prev, newAoi]);
    setSelectedAoiId(id);
    showToast("Areas created");
  };

  const handleToggleVisibility = (id: string) => {
    setAois((prev) =>
      prev.map((a) => (a.id === id ? { ...a, visible: !a.visible } : a))
    );
  };

  const handleDeleteAoi = (id: string) => {
    setAois((prev) => prev.filter((a) => a.id !== id));
    if (selectedAoiId === id) setSelectedAoiId(null);
  };
  

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const allScopeDefined = aois.length > 0;

  return (
    <div className="h-screen w-screen flex bg-[#f5f2ec] text-[#322D29]">
      {/* LEFT: sidebar */}
      <ScopeSidebar
        aois={aois}
        cityPresets={CITY_PRESETS}
        drawingMode={drawingMode}
        onToggleDrawingMode={() => {
          setDrawingMode((prev) => !prev);
          setTempVertices([]);
        }}
        onApplyCityPreset={handleApplyCityPreset}
        selectedAoiId={selectedAoiId}
        onSelectAoi={setSelectedAoiId}
        onToggleVisibility={handleToggleVisibility}
        onDeleteAoi={handleDeleteAoi}
        onFinishScope={() => setScopeFinished(true)}
        scopeFinishEnabled={allScopeDefined}
      />

      {/* RIGHT: map */}
      <div className="flex-1 relative">
        <AoiMap
          center={mapCenter}
          aois={visibleAois}
          selectedAoiId={selectedAoiId}
          drawingMode={drawingMode}
          tempVertices={tempVertices}
          onTempVerticesChange={setTempVertices}
          onPolygonFinished={handleNewPolygon}
        />

        {toastMessage && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <Toast message={toastMessage} />
          </div>
        )}

        {scopeFinished && (
          <Modal onClose={() => setScopeFinished(false)}>
            <div className="text-xl font-semibold mb-3">
              Scope Definition Finished
            </div>
            <p className="text-sm text-[#756659] mb-6">
              Continue to the object(s) detection workflow to configure which
              objects you&apos;d like to detect in the selected areas.
            </p>
            <button className="w-full rounded-2xl px-4 py-3 text-sm font-semibold bg-[#c77733] text-white">
              Continue to object(s) detection workflow
            </button>
            <button
              className="mt-3 w-full text-xs text-[#8a7a66]"
              onClick={() => setScopeFinished(false)}
            >
              Back to area definition
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
