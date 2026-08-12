"use client";

import { motion } from "framer-motion";
import {
  Pencil,
  MessageCircle,
  FilePlus,
} from "lucide-react";

const activity = [
  {
    icon: Pencil,
    title: "Updated Executive Summary",
    user: "John Founder",
    time: "2 min ago",
  },
  {
    icon: MessageCircle,
    title: "Added Comment",
    user: "Sarah Chen",
    time: "1 hour ago",
  },
  {
    icon: FilePlus,
    title: "Created New Section",
    user: "Michael",
    time: "Yesterday",
  },
];

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: .3 }}
      className="rounded-3xl border bg-white p-6 shadow-sm"
    >
      <h3 className="mb-6 text-lg font-semibold">
        Recent Activity
      </h3>

      <div className="space-y-5">

        {activity.map((item) => (

          <div
            key={item.title}
            className="flex gap-4"
          >
            <div
              className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-zinc-100
              "
            >
              <item.icon size={18} />
            </div>

            <div className="flex-1">
              <h4 className="font-medium">
                {item.title}
              </h4>

              <p className="text-sm text-zinc-500">
                {item.user}
              </p>

              <span className="text-xs text-zinc-400">
                {item.time}
              </span>
            </div>
          </div>

        ))}

      </div>
    </motion.div>
  );
}