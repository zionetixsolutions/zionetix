import StatsCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  return (
    <div>

      <p className="text-zinc-500 uppercase tracking-[6px]">
        Overview
      </p>

      <h1 className="text-7xl font-serif mt-4">
        zionetix
      </h1>

      <p className="text-zinc-400 text-2xl mt-4">
        Welcome back, Sujith.
      </p>

      <div className="grid grid-cols-4 gap-6 mt-12">

        <StatsCard
          title="Nodes Validated"
          value="0/8"
        />

        <StatsCard
          title="Nodes At Risk"
          value="0"
        />

        <StatsCard
          title="Logs To Review"
          value="0"
        />

        <StatsCard
          title="Decisions Pending"
          value="0"
        />

      </div>

    </div>
  );
}