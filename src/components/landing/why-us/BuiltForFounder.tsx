"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const comparisons = [
  {
    today:
      "A chatbot that brainstorms with you",
    primordial:
      "A team of four specialists who disagree with each other",
  },
  {
    today:
      "Resets at the end of every chat",
    primordial:
      "One continuous memory across every decision",
  },
  {
    today:
      "Says yes to whatever you ask",
    primordial:
      "Pushes back when you're about to compound a mistake",
  },
  {
    today:
      "Gives you a wall of text",
    primordial:
      "Gives you briefs your investors and engineers can use",
  },
];

export default function BuiltForFounders() {
  return (
    <section className="bg-white border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-28">

        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-10">
          AI Founder Shape
        </p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="max-w-'700px' text-[42px] md:text-[64px] leading-'1' font-medium text-black mb-8"
        >
          Built for the moment before the team exists.
        </motion.h2>

        <p className="max-w-'650px' text-[16px] leading-8 text-neutral-600 mb-20">
          Most tools assume you have already hired.
          Primordial is built for the moment before —
          when one person makes a hundred decisions
          that compound for years.
        </p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="overflow-hidden rounded-[20px] border border-neutral-200"
        >

          <div className="grid grid-cols-2 bg-[#fafaf8]">

            <div className="border-r border-neutral-200 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                What You Have Today
              </p>
            </div>

            <div className="p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                What Primordial Gives You
              </p>
            </div>

          </div>

          {comparisons.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="grid grid-cols-2 border-t border-neutral-200"
              >

                <div className="border-r border-neutral-200 p-6">

                  <p className="text-[15px] text-neutral-700">
                    {item.today}
                  </p>

                </div>

                <div className="p-6 flex items-center gap-3">

                  <Check
                       size={16} className="text-emerald-500 shrink-0"
                  />

                  <p className="text-[15px] text-neutral-900">
                    {item.primordial}
                  </p>

                </div>

              </div>
            )
          )}

        </motion.div>

      </div>

    </section>
  );
}