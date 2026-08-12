"use client";

import { motion } from "framer-motion";

const memoryPoints = [
  "Continuous context across every conversation",
  "Versioned reasoning — see why a decision was made",
  "Decisions log that travels with you",
  "Documents that always reflect the latest call",
];

const decisions = [
  {
    date: "Apr 7",
    title: "AI Tech Lead",
    description:
      "Focus on Memory — relational data, hidden teams.",
  },
  {
    date: "Apr 9",
    title: "AI Market Lead",
    description:
      "Serve AI founders as ICP — wedge survives nobody.",
  },
  {
    date: "Apr 12",
    title: "AI Legal Advisor",
    description:
      "Delaware C-Corp if investment is required.",
  },
  {
    date: "Apr 18",
    title: "AI Finance Advisor",
    description:
      "$1.2M seed · 18mo runway · 3 targets.",
  },
];

export default function MemorySection() {
  return (
    <section className="bg-white border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-8">
              The Memory
            </p>

            <h2 className="text-[42px] md:text-[64px] leading-'1' font-medium text-black mb-8">
              The team that doesnt forget anything.
            </h2>

            <p className="text-[16px] leading-8 text-neutral-600 mb-10 max-w-'600px'">
              Every constraint you have mentioned,
              every decision you have made,
              every pivot — held in one continuous context
              across all four employees.
              So nothing starts from zero.
              So nothing gets re-litigated.
            </p>

            <div className="space-y-4">

              {memoryPoints.map((point) => (

                <div
                  key={point}
                  className="flex items-start gap-3"
                >

                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-3 shrink-0" />

                  <p className="text-[15px] leading-7 text-neutral-600">
                    {point}
                  </p>

                </div>

              ))}

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.15,
            }}
            className="bg-white border border-neutral-200 rounded-[28px] p-8"
          >

            <div className="mb-8">

              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                Decision Log
              </p>

              <h3 className="text-lg font-medium text-black mt-2">
                Shared Memory
              </h3>

            </div>

            <div className="space-y-5">

              {decisions.map((decision) => (

                <div
                  key={`${decision.date}-${decision.title}`}
                  className="border-b border-neutral-100 pb-5"
                >

                  <div className="flex items-center gap-3 mb-2">

                    <span className="text-[11px] text-neutral-400">
                      {decision.date}
                    </span>

                    <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-400">
                      {decision.title}
                    </span>

                  </div>

                  <p className="text-[14px] leading-7 text-neutral-600">
                    {decision.description}
                  </p>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}