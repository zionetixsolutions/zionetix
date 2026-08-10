"use client";

import { motion } from "framer-motion";

export default function TestimonialsHero() {
  return (
    <section className="bg-white border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 pt-28 pb-24">

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

          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-8">
            Testimonials
          </p>

          <h1 className="max-w-'700px' text-[52px] md:text-[86px] leading-[0.95] font-medium text-black mb-10">
            Founders building
            <br />
            with the team.
          </h1>

          <p className="max-w-'620px' text-[18px] leading-9 text-neutral-500">
            The first voice on this page is ours.
            The next ones will be the founders shipping
            with Primordial.
          </p>

        </motion.div>

      </div>

    </section>
  );
}