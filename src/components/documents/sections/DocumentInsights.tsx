"use client";

import { motion } from "framer-motion";

export default function DocumentInsights() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="
      sticky
      top-24
      bg-zinc-50
      border
      border-zinc-200
      rounded-3xl
      p-6
      "
    >
      <h3
        className="
        text-xs
        uppercase
        tracking-widest
        text-zinc-500
        mb-6
        "
      >
        Document Insights
      </h3>

      <div className="space-y-4">
        <StatCard title="Total Documents" value="24" />
        <StatCard title="Completed" value="12" />
        <StatCard title="In Progress" value="08" />
        <StatCard title="Drafts" value="04" />
      </div>

      <div
        className="
        mt-8
        pt-6
        border-t
        border-zinc-200
        "
      >
        <div className="flex justify-between">
          <span className="font-medium">
            Overall Progress
          </span>

          <span className="font-semibold">
            72%
          </span>
        </div>

        <div
          className="
          mt-4
          h-3
          bg-white
          rounded-full
          overflow-hidden
          "
        >
          <div
            className="
            h-full
            w-[72%]
            bg-black
            rounded-full
            "
          />
        </div>

        <button
          className="
          w-full
          mt-8
          py-3
          bg-white
          border
          border-zinc-200
          rounded-2xl
          font-medium
          "
        >
          View Analytics
        </button>
      </div>
    </motion.div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      className="
      bg-white
      border
      border-zinc-200
      rounded-2xl
      p-4
      "
    >
      <p className="text-xs text-zinc-500">
        {title}
      </p>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>
    </div>
  );
}