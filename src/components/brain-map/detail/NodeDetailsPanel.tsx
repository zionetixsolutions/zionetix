"use client";

import { X } from "lucide-react";
import { BrainMapNode }
from "@/types/brain-map";

interface Props {
  node: BrainMapNode | null;
  onClose: () => void;
}

export default function NodeDetailsPanel({
  node,
  onClose,
}: Props) {

  if (!node) return null;

  return (
    <div
      className="
      fixed
      top-[88px]
      right-6
      w-[320px]
      bg-white
      border
      border-zinc-200
      rounded-3xl
      shadow-xl
      z-50
      p-6
      "
    >

      <div className="flex justify-between">

        <h2 className="text-3xl font-bold">
          {node.title}
        </h2>

        <button onClick={onClose}>
          <X size={18}/>
        </button>

      </div>

      <div className="mt-6 space-y-5">

        <div>
          <p className="text-xs text-zinc-400">
            STATUS
          </p>
          <p>{node.status}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
            PARENT NODE
          </p>
          <p>{node.parentNode}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
            CREATED BY
          </p>
          <p>{node.createdBy}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
            LAST UPDATED
          </p>
          <p>{node.updatedAt}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
            CONNECTED NODES
          </p>
          <p>{node.connectedNodes}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
            ACTIVE TASKS
          </p>
          <p>{node.activeTasks}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-400">
            DESCRIPTION
          </p>

          <p className="text-zinc-600">
            {node.description}
          </p>
        </div>

      </div>

    </div>
  );
}