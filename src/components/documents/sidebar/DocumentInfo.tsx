"use client";

import { motion } from "framer-motion";
import {
  FileText,
  User,
  Activity,
  Calendar,
  Clock,
  AlignLeft,
} from "lucide-react";

const info = [
  {
    icon: FileText,
    label: "Type",
    value: "Market Analysis",
  },
  {
    icon: User,
    label: "Owner",
    value: "John Founder",
  },
  {
    icon: Activity,
    label: "Status",
    value: "In Progress",
  },
  {
    icon: AlignLeft,
    label: "Words",
    value: "1,248",
  },
  {
    icon: Calendar,
    label: "Created",
    value: "12 Oct 2026",
  },
  {
    icon: Clock,
    label: "Updated",
    value: "2 minutes ago",
  },
];

export default function DocumentInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: .1 }}
      className="rounded-3xl border bg-white p-6 shadow-sm"
    >
      <h3 className="mb-6 text-lg font-semibold">
        Document Information
      </h3>

      <div className="space-y-5">
        {info.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-zinc-500">
              <item.icon size={18} />
              <span>{item.label}</span>
            </div>

            <span className="font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}