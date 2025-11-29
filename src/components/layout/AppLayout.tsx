import { useState } from "react";

import Header from "./Header";
import LeftPanel from "./LeftPanel";
import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";

import MapView from "../Map/MapView";

export default function AppLayout() {
  const [areas, setAreas] = useState([]);
  const [selectedAoi, setSelectedAoi] = useState(null);

  return (
    <div className="flex flex-col h-screen bg-[#F6EFE4]">

      <Header />

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT BLACK ICON PANEL */}
        <LeftPanel />

        {/* LEFT BEIGE PANEL */}
        <Sidebar areas={areas} setAreas={setAreas} />

        {/* MAP */}
        <div className="flex-1">
          <MapView areas={areas} />
        </div>

        {/* RIGHT PANEL */}
        <RightPanel selectedAoi={selectedAoi} />

      </div>
    </div>
  );
}
