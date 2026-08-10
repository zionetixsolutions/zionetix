"use client";

import { motion } from "framer-motion";

import {
  FolderOpen,
  FileText,
  Users,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    id: "01",
    title: "Workspaces",
    value: "08",
    icon: FolderOpen,
    gradient:
      "from-blue-500/10 to-cyan-500/10",
  },

  {
    id: "02",
    title: "Documents",
    value: "42",
    icon: FileText,
    gradient:
      "from-purple-500/10 to-pink-500/10",
  },

  {
    id: "03",
    title: "Team Members",
    value: "12",
    icon: Users,
    gradient:
      "from-green-500/10 to-emerald-500/10",
  },

  {
    id: "04",
    title: "Pending Decisions",
    value: "05",
    icon: AlertCircle,
    gradient:
      "from-orange-500/10 to-red-500/10",
  },
];

export default function DashboardStats() {
  return (
    <div
      className="
      grid
      grid-cols-4
      gap-6
    "
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className={`
              bg-gradient-to-br
              ${item.gradient}
              backdrop-blur-xl
              border
              border-white/30
              rounded-3xl
              p-6
              shadow-lg
              transition-all
            `}
          >
            <div
              className="
              flex
              justify-between
              items-center
            "
            >
              <div
                className="
                h-10
                w-10
                rounded-xl
                bg-white
                flex
                items-center
                justify-center
                shadow-sm
              "
              >
                <Icon size={18} />
              </div>

              <span
                className="
                text-xs
                font-medium
                text-zinc-400
              "
              >
                {item.id}
              </span>
            </div>

            <h3
              className="
              mt-8
              text-sm
              text-zinc-600
            "
            >
              {item.title}
            </h3>

            <p
              className="
              mt-2
              text-4xl
              font-bold
              text-zinc-900
            "
            >
              {item.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}