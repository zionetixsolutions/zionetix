"use client";

import { motion } from "framer-motion";

export default function WhyUsHero() {
  return (
    <section className="border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-24">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-10"
        >
          Why Primordial
        </motion.p>

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
            duration: 0.7,
          }}
          className="max-w-'700px' text-[48px] md:text-[72px] leading-[0.95] font-medium text-black"
        >
          The founder before the team,
          needs a team.
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
          className="mt-10 max-w-'520px' text-[18px] leading-8 text-neutral-600"
        >
          Not another co-pilot.
          Not another chat window.
          An actual team — four AI employees
          who disagree with each other,
          remember everything and ship
          documents you can defend.
        </motion.p>

      </div>

    </section>
  );
}