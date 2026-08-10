"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-8 py-32">

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
            duration: 0.7,
          }}
          className="max-w-5xl"
        >

          <h2
            className="
              text-[64px]
              leading-[1.05]
              font-medium
              text-black
              tracking-tight
            "
          >
            Free for the first
            <br />
            100 founders.
          </h2>

          <p
            className="
              mt-10
              text-[22px]
              leading-[1.8]
              text-zinc-500
              max-w-3xl
            "
          >
            Full access, 100% off.
            We are working with a small first cohort
            to shape what the product becomes.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-8
              mt-14
            "
          >

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
              Why us →
            </button>

          </div>

        </motion.div>

      </div>
    </section>
  );
}