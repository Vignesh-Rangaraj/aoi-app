// src/components/aoi/SearchPanel.tsx
import { useMemo, useState } from "react";
import type { CityPreset } from "../../layout/AppLayout";

interface SearchPanelProps {
  drawingMode: boolean;
  cityPresets: CityPreset[];
  onToggleDrawingMode: () => void;
  onApplyCityPreset: (preset: CityPreset) => void;
}

const SearchPanel = ({
  drawingMode,
  cityPresets,
  onToggleDrawingMode,
  onApplyCityPreset,
}: SearchPanelProps) => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () =>
      cityPresets.filter((p) =>
        p.label.toLowerCase().includes(searchText.toLowerCase())
      ),
    [cityPresets, searchText]
  );

  return (
    <div className="rounded-2xl border border-[#e4d8c7] bg-[#fdf8f0] p-4 space-y-3">
      <div className="font-semibold">
        Define the area(s) where you will apply your object count & detection
        model
      </div>
      <div className="text-xs text-[#8a7a66]">Options:</div>

      {/* Search button to open dropdown */}
      <div className="relative">
        <button
          className="w-full text-left border border-[#e4d8c7] bg-[#f7efe4] rounded-2xl px-3 py-2 flex items-center gap-2 text-sm"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-lg">🔍</span>
          <span className="text-[#8a7a66]">
            {searchText || "Search for a city, town… or draw area on map"}
          </span>
        </button>

        {open && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-[#e4d8c7] rounded-xl max-h-60 overflow-auto shadow-lg">
            <input
              className="w-full border-b border-[#e4d8c7] px-3 py-2 text-sm outline-none"
              placeholder="city, town, region…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {filtered.map((p) => (
              <button
                key={p.id}
                className="w-full text-left px-3 py-2 text-sm hover:bg-[#fdf5ea]"
                onClick={() => {
                  onApplyCityPreset(p);
                  setSearchText(p.label);
                  setOpen(false);
                }}
              >
                {p.label}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-xs text-[#8a7a66]">
                No matches – click on the map to draw your own area.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Draw mode toggle */}
      <button
        className={`w-full rounded-2xl px-3 py-2 text-sm border ${
          drawingMode
            ? "bg-[#b56f34] text-white border-[#b56f34]"
            : "bg-white text-[#b56f34] border-[#e4d8c7]"
        }`}
        onClick={onToggleDrawingMode}
      >
        {drawingMode
          ? "Drawing mode active – double-click on map to finish"
          : "Or click to draw area on map"}
      </button>

      {/* Upload shape file stub */}
      <button className="w-full rounded-2xl px-3 py-2 text-sm border border-dashed border-[#e4d8c7] bg-[#fbf5eb] text-[#8a7a66]">
        ⬆ Uploading a shape file
      </button>
    </div>
  );
};

export default SearchPanel;
