import { useState } from "react";

export default function SearchAreaPanel({ areas, setAreas }) {
  const [search, setSearch] = useState("");

  const sampleCities = ["Chennai", "Bangalore", "Hyderabad", "Coimbatore"];

  function addAoi() {
    if (!search) return;

    const fakePoly = [
      [12.9, 80.1],
      [12.95, 80.12],
      [12.97, 80.10]
    ];

    setAreas([
      ...areas,
      { name: search, geometry: fakePoly, visible: true }
    ]);
  }

  return (
    <div className="mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 bg-[#EEE2D2] border rounded-lg"
        placeholder="Search for a city or draw area..."
      />

      <button
        onClick={addAoi}
        className="w-full mt-3 bg-[#8C6D5A] text-white py-3 rounded-lg"
      >
        Apply outline as base image
      </button>
    </div>
  );
}
