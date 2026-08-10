"use client";

import { motion } from "framer-motion";

export default function WhatItIs() {
  return (
    <section className="border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-8 py-24">

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
        >

          <p
            className="
              text-[10px]
              tracking-[0.35em]
              uppercase
              text-zinc-500
              mb-16
            "
          >
            What It Is
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

            <p
              className="
                text-[28px]
                leading-[1.6]
                text-black
                font-normal
              "
            >
              Four specialists trained for one job each,
              thinking together from one shared memory.
              They dont start from zero every conversation —
              and neither do you.
            </p>

            <p
              className="
                text-[28px]
                leading-[1.6]
                text-black
                font-normal
              "
            >
              Not a replacement for your manual team.
              Invite a co-founder, a contractor, an advisor —
              they sit at the same table as your AI employees.
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
}