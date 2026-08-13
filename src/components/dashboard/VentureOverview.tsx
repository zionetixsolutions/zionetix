import GlassCard from "./GlassCard";
export default function VentureOverview() {
  return (
    <GlassCard>
    <div className="p-6">
      <h2
 className="
 text-lg
 font-semibold
 text-zinc-900
 mb-6
 "
>
 Venture Overview
</h2>

      <div className="grid grid-cols-2 gap-y-6">
        <div>
          <p className="text-zinc-400 text-sm">
            Venture Name
          </p>

          <p className="font-medium mt-1">
            Startup Alpha
          </p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            Team Size
          </p>

          <p className="font-medium mt-1">
            12 Members
          </p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            Venture ID
          </p>

          <p className="font-medium mt-1">
            VNT-2847-XK
          </p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            Created Date
          </p>

          <p className="font-medium mt-1">
            Oct 12, 2023
          </p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            Current Stage
          </p>

          <span
 className="
 inline-flex
 items-center
 rounded-full
 bg-green-100
 px-4
 py-1
 text-xs
 font-semibold
 text-green-700
 "
>
 Series A
</span>
        </div>
      </div>
    </div>
    </GlassCard>
  );
}