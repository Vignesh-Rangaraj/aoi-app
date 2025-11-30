// src/components/aoi/AreaList.tsx
import type { Aoi } from "../../types/aoi";

interface AreaListProps {
  aois: Aoi[];
  selectedAoiId: string | null;
  onSelectAoi: (id: string | null) => void;
  onToggleVisibility: (id: string) => void;
  onDeleteAoi: (id: string) => void;
}

const AreaList = ({
  aois,
  selectedAoiId,
  onSelectAoi,
  onToggleVisibility,
  onDeleteAoi,
}: AreaListProps) => {
  return (
    <div className="mt-4 space-y-2">
      {aois.map((aoi, index) => (
        <div
          key={aoi.id}
          className={`flex items-center justify-between rounded-xl px-3 py-2 cursor-pointer ${
            selectedAoiId === aoi.id ? "bg-[#f7efe4]" : "hover:bg-[#f7efe4]"
          }`}
          onClick={() => onSelectAoi(aoi.id)}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-[#f7d9a7] border border-[#e0b676]" />
            <span className="text-sm">
              {aoi.name || `Area ${index + 1}`}
            </span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility(aoi.id);
              }}
              title={aoi.visible ? "Hide" : "Show"}
            >
              {aoi.visible ? "👁" : "🚫"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteAoi(aoi.id);
              }}
              title="Delete"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
      {aois.length === 0 && (
        <div className="text-xs text-[#8a7a66]">
          No areas yet – draw on the map or choose a region from the search.
        </div>
      )}
    </div>
  );
};

export default AreaList;
