"use client";

import { motion } from "framer-motion";

export default function BusinessContext() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm"
    >
      <h3 className="font-bold text-xl mb-4">
        Business Context
      </h3>

      <p className="text-zinc-600 leading-8">
        With current growth rates hitting 15% MoM in
        domestic markets, international expansion is
        the logical next step to maintain valuation
        trajectory before the Q4 funding round.
      </p>
    </motion.div>
  );
}