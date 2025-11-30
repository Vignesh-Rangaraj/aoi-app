
import type { Aoi } from "../../types/aoi";
import type { CityPreset } from "../../layout/AppLayout";
import AreaList from "./AreaList";
import SearchPanel from "./SearchPanel";

interface ScopeSidebarProps {
  aois: Aoi[];
  cityPresets: CityPreset[];
  drawingMode: boolean;
  selectedAoiId: string | null;
  scopeFinishEnabled: boolean;
  onToggleDrawingMode: () => void;
  onApplyCityPreset: (preset: CityPreset) => void;
  onSelectAoi: (id: string | null) => void;
  onToggleVisibility: (id: string) => void;
  onDeleteAoi: (id: string) => void;
  onFinishScope: () => void;
}

const ScopeSidebar = ({
  aois,
  cityPresets,
  drawingMode,
  selectedAoiId,
  scopeFinishEnabled,
  onToggleDrawingMode,
  onApplyCityPreset,
  onSelectAoi,
  onToggleVisibility,
  onDeleteAoi,
  onFinishScope,
}: ScopeSidebarProps) => {
  return (
    <div className="w-[360px] border-r border-[#e0d6c7] bg-[#fffaf3] flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#e0d6c7] flex items-center gap-3">
        <button className="text-xl">&lt;</button>
        <div className="text-lg font-semibold">Define Project Scope</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 text-sm">
        {/* Step 1 */}
        <section>
          <div className="font-semibold uppercase tracking-wide text-[11px] text-[#b39a7c]">
            STEP 1
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-medium">Select Base Image</span>
            <button className="text-2xl leading-none">＋</button>
          </div>
        </section>

        {/* Step 2 */}
        <section>
          <div className="font-semibold uppercase tracking-wide text-[11px] text-[#b39a7c]">
            STEP 2
          </div>
          <div className="mt-1 flex items-center justify-between mb-2">
            <span className="font-medium">Define Area of Interest</span>
            <button className="text-2xl leading-none">＋</button>
          </div>

          <SearchPanel
            drawingMode={drawingMode}
            cityPresets={cityPresets}
            onToggleDrawingMode={onToggleDrawingMode}
            onApplyCityPreset={onApplyCityPreset}
          />

          <AreaList
            aois={aois}
            selectedAoiId={selectedAoiId}
            onSelectAoi={onSelectAoi}
            onToggleVisibility={onToggleVisibility}
            onDeleteAoi={onDeleteAoi}
          />
        </section>

        {/* Step 3 */}
        <section className="pt-2 border-t border-[#eee2d3]">
          <div className="font-semibold uppercase tracking-wide text-[11px] text-[#b39a7c]">
            STEP 3
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-medium">Define Objects</span>
            <button className="text-2xl leading-none">＋</button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t border-[#e0d6c7] px-6 py-4">
        <button
          disabled={!scopeFinishEnabled}
          className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold border ${
            scopeFinishEnabled
              ? "bg-[#c77733] text-white border-[#c77733]"
              : "bg-[#f1e4d4] text-[#b6a590] border-[#e0d6c7] cursor-not-allowed"
          }`}
          onClick={onFinishScope}
        >
          Scope definition finished
        </button>
      </div>
    </div>
  );
};

export default ScopeSidebar;
