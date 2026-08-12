export default function WorkspaceInsights() {
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
      <h2
        className="
        text-xl
        font-semibold
        mb-8
        "
      >
        Workspace Insights
      </h2>

      <div className="space-y-4">
        <div
          className="
          border
          rounded-2xl
          p-5
          flex
          justify-between
          "
        >
          <span>Total Workspaces</span>
          <span>08</span>
        </div>

        <div
          className="
          border
          rounded-2xl
          p-5
          flex
          justify-between
          "
        >
          <span>Active</span>
          <span className="text-green-600">
            06
          </span>
        </div>

        <div
          className="
          border
          rounded-2xl
          p-5
          flex
          justify-between
          "
        >
          <span>Archived</span>
          <span>02</span>
        </div>
      </div>
    </div>
  );
}