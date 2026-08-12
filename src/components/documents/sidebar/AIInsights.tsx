"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  CircleCheck,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: .2 }}
      className="
      rounded-3xl
      border
      bg-gradient-to-br
      from-zinc-900
      to-black
      p-6
      text-white
      shadow-xl
      "
    >
      <div className="mb-6 flex items-center gap-3">
        <Sparkles size={22} />

        <h3 className="text-lg font-semibold">
          AI Insights
        </h3>
      </div>

      <div className="space-y-5">

        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center gap-2">
            <CircleCheck
              size={18}
              className="text-green-400"
            />

            <span className="font-medium">
              Strength
            </span>
          </div>

          <p className="mt-2 text-sm text-zinc-300">
            Executive Summary is very clear and concise.
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle
              size={18}
              className="text-yellow-400"
            />

            <span className="font-medium">
              Suggestions
            </span>
          </div>

          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>• Add competitor pricing</li>
            <li>• Include TAM / SAM graph</li>
            <li>• Expand Risk Analysis</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={18}
              className="text-cyan-400"
            />

            <span className="font-medium">
              AI Score
            </span>
          </div>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold">
              91
            </span>

            <span className="pb-1 text-zinc-400">
              /100
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}