"use client";

import { motion } from "framer-motion";

const founders = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
];

const colors = [
  "bg-blue-50",
  "bg-pink-50",
  "bg-yellow-50",
  "bg-green-50",
  "bg-purple-50",
  "bg-orange-50",
];

export default function UpcomingVoices() {
  return (
    <section className="bg-white border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-28">

        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-8">
          Up Next
        </p>

        <h2 className="text-[42px] md:text-[64px] leading-'1' font-medium text-black mb-6">
          More voices, soon.
        </h2>

        <p className="text-neutral-500 mb-16">
          Founders shipping with Primordial right now.
          Their stories land here as they go live.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {founders.map((number, index) => (

            <motion.div
              key={number}
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
                delay: index * 0.08,
              }}
              className="rounded-'24px' overflow-hidden border border-neutral-200 bg-white"
            >

              <div
                className={`${colors[index]} h-'180px' flex items-center justify-center`}
              >

                <span className="text-[82px] font-medium text-neutral-300">
                  {number}
                </span>

              </div>

              <div className="p-6">

                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">
                  Coming Soon
                </p>

                <h3 className="text-[28px] font-medium text-black mb-3">
                  Founder · {number}
                </h3>

                <p className="text-neutral-500 leading-7">
                  A founder building with Primordial.
                  Their story drops here.
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}