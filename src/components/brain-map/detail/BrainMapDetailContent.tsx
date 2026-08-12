export default function BrainMapDetailContent() {
  return (
    <div className="px-12 py-10">

      {/* Breadcrumb */}
      <div className="text-xs text-zinc-500 mb-6">
        PRIMORDIAL / BRAIN MAP / STRATEGIC OVERVIEW
      </div>

      {/* Title */}
      <div className="flex justify-between">

        <div>
          <h1
            className="
            text-[56px]
            leading-none
            font-serif
            "
          >
            Strategic Overview
          </h1>

          <p className="mt-4 text-zinc-500 italic">
            Visualize ideas, relationships,
            dependencies, and venture intelligence.
          </p>

          <p className="mt-5 text-xs tracking-widest text-zinc-400">
            LAST UPDATED: 2H AGO
          </p>
        </div>

        <div className="flex gap-4">
          <button>
            Create Node
          </button>

          <button>
            Add Log
          </button>
        </div>

      </div>

      {/* Rest of screen */}
    </div>
  );
}