import SearchAreaPanel from "../../panels/SearchAreaPanel";
import BaseImagePanel from "../../panels/BaseImagePanel";
import DefineObjectsPanel from "../../panels/DefineObjectsPanel";

export default function Sidebar({ areas, setAreas }) {
  return (
    <div className="w-[340px] bg-[#F7EEDC] border-r border-[#D4C8B8] p-5 overflow-y-auto">

      <h1 className="text-[#C06A2B] text-xl font-semibold mb-5">
        Define Area of Interest
      </h1>

      <SearchAreaPanel areas={areas} setAreas={setAreas} />

      <BaseImagePanel />

      <DefineObjectsPanel />

    </div>
  );
}
