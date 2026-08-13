import GlassCard from "./GlassCard";
const activities = [
  "Uploaded Pitch Deck v2.4",
  "Brain Map Updated",
  "Team Member Added",
  "Document Edited",
];

export default function RecentActivity() {
  return (
    <GlassCard>
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="font-semibold">
          Recent Activity
        </h2>

        <button className="text-sm text-zinc-500">
          View Timeline
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {activities.map((item) => (
          <div
            key={item}
            className="flex gap-4"
          >
            <div
              className="
              w-4
              h-4
              rounded-full
              bg-gradient-to-br
              from-black
              to-zinc-500
              mt-1
              "
            />

            <div>
              <p className="font-medium">
                {item}
              </p>

              <p className="text-sm text-zinc-400">
                2 hours ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </GlassCard>
  );
}