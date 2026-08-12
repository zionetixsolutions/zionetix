"use client";

import { motion } from "framer-motion";

export default function ProblemStatement() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm"
    >
      <h3 className="font-bold text-xl mb-4">
        Problem Statement
      </h3>

      <p className="text-zinc-600 leading-8">
        Latency issues for our current 400+
        European trial users are causing
        a 12% drop-off during onboarding,
        requiring local infrastructure.
      </p>
    </motion.div>
  );
}