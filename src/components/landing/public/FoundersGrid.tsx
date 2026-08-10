"use client";

import { motion } from "framer-motion";

const founders = [
  {
    number: "01",
    color: "bg-blue-100",
  },
  {
    number: "02",
    color: "bg-pink-100",
  },
  {
    number: "03",
    color: "bg-yellow-100",
  },
  {
    number: "04",
    color: "bg-emerald-100",
  },
  {
    number: "05",
    color: "bg-purple-100",
  },
  {
    number: "06",
    color: "bg-orange-100",
  },
];

export default function FoundersGrid() {
  return (
    <section className="bg-[#f7f7f3] border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {founders.map(
            (
              founder,
              index
            ) => (

              <motion.div
                key={founder.number}
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
                  delay:
                    index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className="overflow-hidden rounded-[28px] bg-white border border-neutral-200"
              >

                <div
                  className={`${founder.color} h-'220px' flex items-center justify-center`}
                >
                  <span className="text-[72px] font-medium text-neutral-400">
                    {founder.number}
                  </span>
                </div>

                <div className="p-6">

                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
                    Coming Soon
                  </p>

                  <h3 className="text-[28px] font-medium text-black mb-3">
                    Founder · {founder.number}
                  </h3>

                  <p className="text-[14px] leading-7 text-neutral-500">
                    A company being built in public
                    with the Primordial team.
                  </p>

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>
  );
}