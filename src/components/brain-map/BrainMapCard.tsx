"use client";

import {
  Pencil,
  Trash2,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import { BrainMap } from "@/types/brainmap";

interface Props {
  brainMap: BrainMap;
}

export default function BrainMapCard({
  brainMap,
}: Props) {
  return (
    <div
      className="
      bg-white
      border
      border-zinc-200
      rounded-3xl
      p-6
      flex
      flex-col
      justify-between
      h-[300px]
      "
    >
      <div>

        <div className="flex justify-between">

          <span
            className={`
            px-3
            py-1
            rounded-lg
            text-xs
            font-medium

            ${
              brainMap.status === "ACTIVE"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-zinc-100 text-zinc-600"
            }
            `}
          >
            {brainMap.status}
          </span>

          <div className="flex gap-4">
            <button>
              <Pencil size={16} />
            </button>

            <button>
              <Trash2 size={16} />
            </button>
          </div>

        </div>

        <h3
          className="
          text-2xl
          font-semibold
          mt-6
          "
        >
          {brainMap.name}
        </h3>

        <p
          className="
          text-sm
          text-zinc-500
          mt-2
          "
        >
          Workspace: {brainMap.workspace}
        </p>

        <p
          className="
          text-zinc-600
          mt-5
          leading-7
          "
        >
          {brainMap.description}
        </p>

      </div>

      <div>

        <div
          className="
          border-t
          pt-4
          flex
          items-center
          gap-5
          text-sm
          text-zinc-500
          "
        >
          <div className="flex items-center gap-2">
            <GitBranch size={14} />
            {brainMap.nodes} Nodes
          </div>

          <span>
            Updated {brainMap.updated}
          </span>
        </div>

        <Link
  href={`/founder/brain-map/${brainMap.id}`}
  className="
  w-full
  h-10
  bg-black
  text-white
  rounded-lg
  flex
  items-center
  justify-center
  hover:opacity-90
  transition
  "
>
  Open Brain Map
</Link>

      </div>
    </div>
  );
}