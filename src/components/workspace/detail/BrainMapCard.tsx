"use client";

import {
  Network,
  ExternalLink,
} from "lucide-react";

export default function BrainMapCard() {
  return (
    <div
      className="
        bg-white
        border
        border-zinc-200
        rounded-2xl
        p-6
        h-full
      "
    >
      <div className="flex gap-5">
        <div
          className="
            w-28
            h-28
            rounded-2xl
            bg-violet-50
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Network
            size={42}
            className="text-violet-500"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              Visual Architecture
            </p>

            <h3 className="font-semibold text-lg mt-1">
              Product Development Brain Map
            </h3>

            <p className="text-sm text-zinc-500 mt-2 leading-6 max-w-md">
              A visual representation of the product
              development flow, dependencies,
              priorities and key decisions.
            </p>
          </div>

          <button
            className="
              mt-4
              flex
              items-center
              gap-2
              bg-black
              text-white
              px-4
              py-2
              rounded-xl
              text-sm
              font-medium
              w-fit
              hover:opacity-90
              transition
            "
          >
            View Brain Map

            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}