export default function BrainMapStats() {
  return (
    <div className="grid grid-cols-4 gap-6">

      <div className="bg-white border rounded-3xl p-6">
        <p className="text-xs text-zinc-500 uppercase">
          Total Brain Maps
        </p>

        <h3 className="text-4xl font-bold mt-3">
          12
        </h3>
      </div>

      <div className="bg-white border rounded-3xl p-6">
        <p className="text-xs text-zinc-500 uppercase">
          Active Brain Maps
        </p>

        <h3 className="text-4xl font-bold mt-3">
          08
        </h3>
      </div>

      <div className="bg-white border rounded-3xl p-6">
        <p className="text-xs text-zinc-500 uppercase">
          Total Nodes
        </p>

        <h3 className="text-4xl font-bold mt-3">
          428
        </h3>
      </div>

      <div className="bg-white border rounded-3xl p-6">
        <p className="text-xs text-zinc-500 uppercase">
          Recently Updated
        </p>

        <h3 className="text-4xl font-bold mt-3">
          3h ago
        </h3>
      </div>

    </div>
  );
}