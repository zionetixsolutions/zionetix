"use client";

import { Download, Plus } from "lucide-react";

export default function DecisionInboxHeader() {
  return (
    <div className="flex items-start justify-between">

      <div>
        <h1
          className="
          text-[64px]
          leading-none
          font-serif
          "
        >
          Decision Inbox
        </h1>

        <p
          className="
          mt-4
          text-zinc-500
          text-xl
          "
        >
          Review, track and manage all
          business decisions from one place.
        </p>
      </div>

      <div className="flex gap-4">

        <button
          className="
          h-14
          px-8
          border
          rounded-2xl
          flex
          items-center
          gap-3
          "
        >
          Export
          <Download size={18} />
        </button>

        <button
          className="
          h-14
          px-8
          bg-black
          text-white
          rounded-2xl
          flex
          items-center
          gap-3
          "
        >
          <Plus size={18} />
          New Decision
        </button>

      </div>
    </div>
  );
}