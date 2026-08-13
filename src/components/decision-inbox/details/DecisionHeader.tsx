"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function DecisionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
        <span>Dashboard</span>
        <ChevronRight size={12} />
        <span>Decision Inbox</span>
        <ChevronRight size={12} />
        <span className="text-black font-semibold">
          Decision Details
        </span>
      </div>

      <button className="flex items-center gap-2 text-sm font-medium hover:underline">
        <ArrowLeft size={16} />
        Back to Decision Inbox
      </button>

      <div>
        <h1 className="font-serif text-6xl leading-none">
          Decision Inbox
        </h1>

        <p className="mt-3 text-lg italic text-zinc-500">
          Review, track and manage all business decisions from one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded bg-black text-white text-[10px] uppercase tracking-wider font-bold">
          Strategic
        </span>

        <span className="px-3 py-1 rounded bg-red-100 text-red-700 text-[10px] uppercase tracking-wider font-bold">
          High Priority
        </span>

        <span className="px-3 py-1 rounded bg-zinc-100 text-zinc-600 text-[10px] uppercase tracking-wider font-bold">
          Pending Review
        </span>
      </div>

      <h2 className="text-5xl font-bold">
        Series A Expansion Strategy
      </h2>
    </motion.div>
  );
}