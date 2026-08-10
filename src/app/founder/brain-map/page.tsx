import BrainMapSearchBar from "@/components/brain-map/BrainMapSearchBar";
import BrainMapStats from "@/components/brain-map/BrainMapStats";
import BrainMapGrid from "@/components/brain-map/BrainMapGrid";
import BrainMapTable from "@/components/brain-map/BrainMapTable";
export default function BrainMapPage() {
  return (
    <div className="p-8">

      <div>
        <p className="text-sm text-zinc-500">
          PRIMORDIAL / BRAIN MAP
        </p>

        <h1 className="text-6xl font-serif mt-4">
          Brain Maps
        </h1>

        <p className="text-zinc-500 mt-3">
          Manage and organize your ventures
          strategic Brain Maps.
        </p>
      </div>

      <div className="mt-8">
        <BrainMapSearchBar />
      </div>

      <div className="mt-8">
        <BrainMapStats />
      </div>

     <div className="mt-8">
  <BrainMapGrid />
</div>

<div className="mt-8">
  <BrainMapTable />
</div>

    </div>
  );
}