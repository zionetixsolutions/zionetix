import { brainMaps } from "@/data/brainMaps";
import BrainMapCard from "./BrainMapCard";

export default function BrainMapGrid() {
  return (
    <div
      className="
      grid
      grid-cols-3
      gap-6
      "
    >
      {brainMaps.map((brainMap) => (
        <BrainMapCard
          key={brainMap.id}
          brainMap={brainMap}
        />
      ))}
    </div>
  );
}