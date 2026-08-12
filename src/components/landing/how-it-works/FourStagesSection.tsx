"use client";

import { motion } from "framer-motion";

const stages = [
  {
    number: "01",
    label: "IDEA",
    title: "Capture the spark.",
    description:
      "Bring the half-formed thought. The Market Lead pressure-tests demand. The Tech Lead scopes a buildable shape. The Legal and Finance Advisors flag what to ask up first.",
    point:
      "A clear articulation of what you're building — and why now.",
  },
  {
    number: "02",
    label: "DECIDE",
    title: "Structure the choices.",
    description:
      "Surface the decisions that compound. Pressure-test assumptions. Model trade-offs against time and cost — across all four employees.",
    point:
      "A documented decision log — every direction taken, every alternative considered.",
  },
  {
    number: "03",
    label: "REFINE",
    title: "Sharpen direction.",
    description:
      "Return to past decisions as new signal lands. Flag drift. Coordinate across the whole team so nothing gets re-litigated.",
    point:
      "Living docs that always reflect the latest call — not last month’s.",
  },
  {
    number: "04",
    label: "SHIP",
    title: "Hand it off, ready.",
    description:
      "Briefs that are buildable. Cap tables you can defend. Investor narratives backed by traction. Output that threads with you.",
    point:
      "Documents your team, your investors and your lawyers can actually use.",
  },
];

export default function FourStagesSection() {
  return (
    <section className="bg-[#f7f7f3] border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {stages.map((stage, index) => (

            <motion.div
              key={stage.number}
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
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -4,
              }}
              className="bg-white border border-neutral-200 rounded-[22px] p-8"
            >

              <div className="flex justify-between items-center mb-10">

                <span className="text-[11px] text-neutral-400">
                  {stage.number}
                </span>

                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                  {stage.label}
                </span>

              </div>

              <h3 className="text-[32px] leading-[1.1] font-medium text-black mb-6">
                {stage.title}
              </h3>

              <p className="text-[15px] leading-7 text-neutral-600 mb-10">
                {stage.description}
              </p>

              <div className="border-t border-neutral-200 pt-5">

                <div className="flex gap-3">

                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-3 shrink-0" />

                  <p className="text-[14px] leading-7 text-neutral-500">
                    {stage.point}
                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}