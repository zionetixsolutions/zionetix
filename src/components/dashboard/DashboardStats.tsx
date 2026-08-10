"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FolderOpen,
  FileText,
  Users,
  AlertCircle,
} from "lucide-react";

const statsConfig = [
  {
    id: "01",
    title: "Workspaces",
    key: "workspaces",
    icon: FolderOpen,
    gradient: "from-blue-500/10 to-cyan-500/10",
  },

  {
    id: "02",
    title: "Documents",
    key: "documents",
    icon: FileText,
    gradient: "from-purple-500/10 to-pink-500/10",
  },

  {
    id: "03",
    title: "Team Members",
    key: "teamMembers",
    icon: Users,
    gradient: "from-green-500/10 to-emerald-500/10",
  },

  {
    id: "04",
    title: "Pending Decisions",
    key: "pendingDecisions",
    icon: AlertCircle,
    gradient: "from-orange-500/10 to-red-500/10",
  },
];

export default function DashboardStats() {

  const [stats, setStats] = useState({
    workspaces: 0,
    documents: 0,
    teamMembers: 0,
    pendingDecisions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDashboardStats = async () => {

      try {

        const response = await fetch("/api/dashboard");

        const result = await response.json();

        if (result.success) {

          setStats((prev) => ({
            ...prev,

            workspaces: result.data.length,
          }));

        }

      } catch (error) {

        console.error(
          "Failed to fetch dashboard stats:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchDashboardStats();

  }, []);

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {statsConfig.map((item, index) => {

        const Icon = item.icon;

        const value =
          stats[item.key as keyof typeof stats];

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
              {loading
                ? "..."
                : String(value).padStart(2, "0")}
            </p>

          </motion.div>

        );

      })}

    </div>

  );
}