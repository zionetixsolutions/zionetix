"use client";

import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";

interface Props {
  onCreate: () => void;
}

export default function DocumentsToolbar({
  onCreate,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.1,
      }}
      className="
      flex
      flex-wrap
      items-center
      justify-between
      gap-4
      "
    >
      {/* LEFT */}

      <div
        className="
        flex
        items-center
        gap-3
        flex-1
        "
      >
        {/* SEARCH */}

        <div
          className="
          relative
          max-w-md
          w-full
          "
        >
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
            type="text"
            placeholder="Search documents..."
            className="
            w-full
            pl-11
            pr-4
            py-3
            border
            border-zinc-200
            rounded-2xl
            text-sm
            outline-none
            focus:ring-2
            focus:ring-black/5
            "
          />
        </div>

        {/* FILTER */}

        <select
          className="
          px-4
          py-3
          border
          border-zinc-200
          rounded-2xl
          text-sm
          "
        >
          <option>All Filters</option>
          <option>Draft</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        {/* SORT */}

        <select
          className="
          px-4
          py-3
          border
          border-zinc-200
          rounded-2xl
          text-sm
          "
        >
          <option>Recently Updated</option>
          <option>Alphabetical</option>
          <option>Completion</option>
        </select>
      </div>

      {/* CREATE */}

      <button
        onClick={onCreate}
        className="
        bg-black
        text-white
        px-5
        py-3
        rounded-2xl
        flex
        items-center
        gap-2
        text-sm
        font-medium
        hover:scale-[1.02]
        transition
        "
      >
        <Plus size={18} />

        Create Document
      </button>
    </motion.div>
  );
}