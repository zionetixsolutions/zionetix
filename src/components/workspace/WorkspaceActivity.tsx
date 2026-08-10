const activity = [
  "New Note in Product Dev",
  "File Uploaded to Fundraising",
  "Workspace 'Marketing' status changed to Planning",
  "3 New Files in Legal Docs",
  "Workspace 'Investor Room' Archived",
];

export default function WorkspaceActivity() {
  return (
    <div
      className="
      bg-white
      border
      border-zinc-200
      rounded-3xl
      p-8
      "
    >
      <h2 className="text-xl font-semibold mb-8">
        Recent Workspace Activity
      </h2>

      <div className="space-y-6">
        {activity.map((item) => (
          <div
            key={item}
            className="flex gap-4"
          >
            <div
              className="
              h-4
              w-4
              rounded-full
              border-2
              border-black
              mt-1
              "
            />

            <div>
              <p>{item}</p>

              <p
                className="
                text-sm
                text-zinc-400
                "
              >
                2 hours ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}