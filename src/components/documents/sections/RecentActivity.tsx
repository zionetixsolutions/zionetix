"use client";

import { motion } from "framer-motion";

const activities = [
  {
    title: "Tech Architecture",
    action: "Edited by Marcus Tech",
    time: "Just now",
  },
  {
    title: "Product Roadmap",
    action: "Completed by Sarah Chen",
    time: "2 hours ago",
  },
  {
    title: "Market Analysis",
    action: "Created by John Founder",
    time: "Yesterday",
  },
];

export default function RecentActivity() {
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
      className="
      bg-white
      border
      border-zinc-200
      rounded-3xl
      overflow-hidden
      "
    >
      <div
        className="
        px-6
        py-5
        border-b
        border-zinc-200
        "
      >
        <h3 className="font-semibold">
          Recent Activity
        </h3>
      </div>

      {activities.map((item, index) => (
        <div
          key={index}
          className="
          px-6
          py-5
          border-b
          border-zinc-100
          hover:bg-zinc-50
          transition
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="font-medium">
                {item.title}
              </p>

              <p className="text-sm text-zinc-500">
                {item.action}
              </p>
            </div>

            <span
              className="
              text-xs
              text-zinc-400
              "
            >
              {item.time}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}