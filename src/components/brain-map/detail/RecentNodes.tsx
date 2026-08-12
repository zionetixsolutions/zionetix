"use client";

const nodes = [
  {
    name: "Product Roadmap",
    parent: "Product",
    updated: "1 hour ago",
  },

  {
    name: "Tech Stack",
    parent: "Technology",
    updated: "3 hours ago",
  },

  {
    name: "Market Analysis",
    parent: "Market",
    updated: "Yesterday",
  },
];

export default function RecentNodes() {
  return (
    <div>
      <h2
        className="
        text-3xl
        font-semibold
        mb-6
        "
      >
        Recent Nodes
      </h2>

      <div
        className="
        grid
        grid-cols-3
        gap-6
        "
      >
        {nodes.map((node) => (
          <div
            key={node.name}
            className="
            bg-white
            border
            border-zinc-200
            rounded-[24px]
            p-5
            "
          >
            <h3 className="font-medium">
              {node.name}
            </h3>

            <p className="mt-3 text-sm text-zinc-500">
              Parent: {node.parent}
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Updated: {node.updated}
            </p>

            <div className="mt-5 flex gap-3">
              <button
                className="
                flex-1
                h-10
                rounded-lg
                bg-black
                text-white
                "
              >
                Open
              </button>

              <button
                className="
                flex-1
                h-10
                rounded-lg
                border
                border-zinc-200
                "
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}