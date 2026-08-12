"use client";

import { motion } from "framer-motion";

export default function PublicHero() {
  return (
    <section className="border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-28">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-10"
        >
          Built With Primordial
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
            duration: 0.6,
          }}
          className="max-w-'700px' text-[52px] md:text-[88px] leading-[0.95] font-medium text-black"
        >
          Companies, in public view.
        </motion.h1>

        <p className="mt-10 max-w-'540px' text-[18px] leading-8 text-neutral-600">
          Founders are shipping with Primordial.
          Their work appears here as it lands —
          from first idea to working product,
          decisions and all.
        </p>

      </div>

    </section>
  );
}