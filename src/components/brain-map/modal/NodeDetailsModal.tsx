"use client";

import Draggable from "react-draggable";

import { X } from "lucide-react";

import { BrainMapNode }
from "@/types/brain-map";

interface Props {
  node: BrainMapNode | null;
  onClose: () => void;
}

export default function NodeDetailsModal({
  node,
  onClose,
}: Props) {

  if (!node) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-[999]
      bg-black/10
      backdrop-blur-sm
      flex
      items-center
      justify-center
      "
    >
      <Draggable handle=".drag-handle">

        <div
          className="
          w-[520px]
          bg-white
          rounded-[28px]
          shadow-2xl
          border
          border-zinc-200
          overflow-hidden
          "
        >

          <div
            className="
            drag-handle
            cursor-move
            px-8
            py-5
            border-b
            border-zinc-200
            flex
            items-center
            justify-between
            bg-zinc-50
            "
          >
            <div>

              <p
                className="
                text-xs
                tracking-widest
                text-zinc-400
                "
              >
                NODE DETAILS
              </p>

              <h2
                className="
                text-2xl
                font-bold
                mt-1
                "
              >
                {node.title}
              </h2>

            </div>

            <button
              onClick={onClose}
              className="
              w-10
              h-10
              rounded-xl
              hover:bg-zinc-100
              flex
              items-center
              justify-center
              "
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-8 space-y-8">

            <div
              className="
              grid
              grid-cols-2
              gap-6
              "
            >
              <div>

                <p className="text-sm text-zinc-500">
                  Status
                </p>

                <div
                  className="
                  mt-2
                  inline-flex
                  px-3
                  py-1
                  rounded-full
                  bg-emerald-100
                  text-emerald-700
                  text-sm
                  font-medium
                  "
                >
                  {node.status}
                </div>

              </div>

              <div>

                <p className="text-sm text-zinc-500">
                  Parent Node
                </p>

                <p
                  className="
                  mt-2
                  font-semibold
                  "
                >
                  {node.parentNode}
                </p>

              </div>
            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Created By
              </p>

              <p
                className="
                mt-2
                font-medium
                "
              >
                {node.createdBy}
              </p>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Description
              </p>

              <p
                className="
                mt-3
                text-zinc-700
                leading-7
                "
              >
                {node.description}
              </p>

            </div>

            <button
              className="
              w-full
              h-12
              rounded-xl
              bg-black
              text-white
              font-medium
              "
            >
              Edit Node
            </button>

          </div>

        </div>

      </Draggable>
    </div>
  );
}