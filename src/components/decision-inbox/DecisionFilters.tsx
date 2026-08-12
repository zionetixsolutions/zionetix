"use client";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

export default function DecisionFilters() {
  return (
    <div
      className="
      bg-white
      border
      rounded-[28px]
      p-6
      flex
      gap-4
      "
    >
      <div className="relative flex-1">

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
          placeholder="Search decisions..."
          className="
          h-14
          w-full
          border
          rounded-xl
          pl-12
          "
        />
      </div>

      <select className="h-14 px-5 border rounded-xl">
        <option>All Status</option>
      </select>

      <select className="h-14 px-5 border rounded-xl">
        <option>All Categories</option>
      </select>

      <select className="h-14 px-5 border rounded-xl">
        <option>Priority: All</option>
      </select>

      <button
        className="
        h-14
        px-6
        border
        rounded-xl
        flex
        items-center
        gap-2
        "
      >
        <SlidersHorizontal size={18} />
        Sort
      </button>
    </div>
  );
}