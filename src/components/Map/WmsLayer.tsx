import { WMSTileLayer } from "react-leaflet";

export default function WmsLayer() {
  return (
    <WMSTileLayer
      url="https://ahocevar.com/geoserver/wms"
      params={{
        layers: "topp:states",
        format: "image/png",
        transparent: true,
      }}
    />
  );
}
