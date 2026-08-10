"use client";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Plus,
} from "lucide-react";

export default function BrainMapSearchBar() {
  return (
    <div
      className="
      bg-white
      border
      border-zinc-200
      rounded-3xl
      p-5
      flex
      items-center
      justify-between
      "
    >
      <h2 className="text-2xl font-semibold">
        Brain Maps
      </h2>

      <div className="flex gap-4">

        <div className="relative">
          <Search
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-zinc-400
            "
          />

          <input
            placeholder="Search Brain Maps"
            className="
            h-12
            w-[260px]
            border
            rounded-xl
            pl-12
            outline-none
            "
          />
        </div>

        <button
          className="
          h-12
          px-6
          border
          rounded-xl
          flex
          items-center
          gap-2
          "
        >
          <SlidersHorizontal size={16} />
          Filter
        </button>

        <button
          className="
          h-12
          px-6
          border
          rounded-xl
          flex
          items-center
          gap-2
          "
        >
          <ArrowUpDown size={16} />
          Sort
        </button>

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
          "
        >
          <Plus size={16} />
          Create Brain Map
        </button>

      </div>
    </div>
  );
}