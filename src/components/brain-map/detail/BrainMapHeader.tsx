"use client";

import { Plus } from "lucide-react";

export default function BrainMapHeader() {
  return (
    <div>

      <div
        className="
        flex
        items-start
        justify-between
        "
      >

        <div>

          <div className="flex items-center gap-3">

            <h1
              className="
              text-[52px]
              font-serif
              leading-none
              "
            >
              Strategic Overview
            </h1>

            <span
              className="
              px-3
              py-1
              rounded-full
              bg-emerald-50
              text-emerald-600
              text-xs
              font-medium
              "
            >
              ACTIVE
            </span>

          </div>

          <p
            className="
            mt-4
            text-zinc-500
            italic
            "
          >
            Visualize ideas, relationships, dependencies,
            and venture intelligence.
          </p>

          <p
            className="
            mt-4
            text-xs
            tracking-wider
            text-zinc-400
            uppercase
            "
          >
            Last Updated: 2h Ago
          </p>

        </div>

        <div className="flex gap-4">

          <button
            className="
            h-12
            px-6
            bg-black
            text-white
            rounded-xl
            flex
            items-center
            gap-2
            hover:opacity-90
            "
          >
            <Plus size={16} />
            Create Node
          </button>

          <button
            className="
            h-12
            px-6
            border
            border-zinc-300
            rounded-xl
            hover:bg-zinc-50
            "
          >
            Add Log
          </button>

        </div>

      </div>

    </div>
  );
}