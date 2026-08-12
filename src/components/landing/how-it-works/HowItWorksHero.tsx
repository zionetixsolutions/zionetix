"use client";

import { motion } from "framer-motion";

export default function HowItWorksHero() {
  return (
    <section className="border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-28">

        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-10">
          How It Works
        </p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="max-w-'700px' text-[52px] md:text-[88px] leading-[0.95] font-medium text-black"
        >
          Spark to ship, in four stages.
        </motion.h1>

        <p className="mt-10 max-w-'600px' text-[18px] leading-8 text-neutral-600">
          Your AI team works the same way a great human team would —
          capture, decide, refine, ship.
          Except they remember everything,
          never miss a meeting,
          and they are already hired.
        </p>

      </div>

    </section>
  );
}