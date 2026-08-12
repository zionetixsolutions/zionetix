"use client";

import { motion } from "framer-motion";

const impactData = [
  {
    title: "Revenue Impact",
    value: "+$4.2M",
    color: "text-emerald-600",
  },
  {
    title: "Cost Savings",
    value: "15%",
    color: "text-black",
  },
  {
    title: "Timeline",
    value: "6 Mo.",
    color: "text-black",
  },
  {
    title: "Risk Level",
    value: "Medium",
    color: "text-amber-600",
  },
];

export default function ExpectedImpact() {
  return (
    <section className="space-y-6">
      <h3 className="text-2xl font-semibold">
        Expected Impact
      </h3>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {impactData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">
              {item.title}
            </p>

            <h4
              className={`text-3xl font-bold ${item.color}`}
            >
              {item.value}
            </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}