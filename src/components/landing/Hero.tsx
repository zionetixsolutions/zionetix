"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-8 py-24">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-3xl"
        >

          <h1 className="text-[72px] leading-[0.95] font-semibold tracking-tight text-black">
            Hire your first AI team.
          </h1>

          <p className="mt-8 text-[18px] leading-8 text-zinc-500 max-w-2xl">
            Primordial gives founders four AI employees —
            Tech, Market, Legal and Finance —
            working from one shared memory.
            Add your manual team to the same table.
            Ship faster. Stay lean.
          </p>

          <div className="flex items-center gap-8 mt-10">

            <button
              className="
                bg-orange-500
                hover:bg-orange-600
                transition-all
                duration-300
                text-white
                px-8
                py-4
                rounded-xl
                text-sm
                font-medium
              "
            >
              Apply for early access →
            </button>

            <button
              className="
                text-black
                text-sm
                font-medium
                hover:translate-x-1
                transition-all
                duration-300
              "
            >
              How it works →
            </button>

          </div>

          <p className="mt-5 text-xs text-zinc-400">
            Free for the first 100 founders. No credit card.
          </p>

        </motion.div>

      </div>
    </section>
  );
}