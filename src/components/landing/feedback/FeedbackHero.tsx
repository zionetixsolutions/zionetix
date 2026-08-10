"use client";

import { motion } from "framer-motion";

export default function FeedbackHero() {
  return (
    <section className="bg-white">

      <div className="max-w-'900px' mx-auto px-6 pt-28 text-center">

        <motion.div
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
        >

          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 mb-8">
            Feedback
          </p>

          <h1 className="text-[52px] md:text-[92px] leading-[0.95] font-medium text-[#0f172a] mb-10">
            Tell us what
            <br />
            we should see.
          </h1>

          <p className="max-w-'780px' mx-auto text-[18px] md:text-[20px] leading-9 text-neutral-500 mb-8">
            Primordial is shaped by the founders who use it.
            Your thoughts go straight to the team building it.
          </p>

          <p className="italic text-neutral-400 text-[18px]">
            We read everything.
          </p>

        </motion.div>

      </div>

    </section>
  );
}