"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const decisions = [
  "Allocate $2.4M for EU infrastructure and core regional hires.",
  "Approve the 6-month roadmap for localized product deployments.",
  "Establish a UK legal entity for hiring and compliance purposes.",
];

export default function ProposedDecision() {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl border border-zinc-200 p-10 shadow-sm"
    >
      <h3 className="text-xl font-semibold mb-8">
        Proposed Decision
      </h3>

      <div className="space-y-6">
        {decisions.map((item) => (
          <div
            key={item}
            className="flex items-start gap-4"
          >
            <CheckCircle2
              size={20}
              className="mt-1 text-black"
            />

            <p className="text-zinc-600 leading-7">
              {item}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}