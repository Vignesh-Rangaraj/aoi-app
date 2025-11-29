export default function RightPanel({ selectedAoi }) {
  return (
    <div className="w-[320px] bg-[#F7EEDC] border-l border-[#D4C8B8] p-5 overflow-y-auto">

      <h1 className="text-[#C06A2B] text-xl font-semibold">AOI Info</h1>

      {!selectedAoi && (
        <p className="text-gray-600 mt-4">
          Select an AOI on the map to view details.
        </p>
      )}

      {selectedAoi && (
        <div className="mt-4 bg-white p-4 rounded-xl border shadow">
          <p><strong>Name:</strong> {selectedAoi.name}</p>
          <p><strong>Area:</strong> {selectedAoi.area} sq km</p>
        </div>
      )}
    </div>
  );
}
