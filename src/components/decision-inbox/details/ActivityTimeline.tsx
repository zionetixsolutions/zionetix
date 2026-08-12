"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    title: "Proposal Created",
    date: "OCT 14, 2023 • 09:42 AM",
    description:
      "Initiated by John Founder (CEO)",
    active: true,
  },
  {
    title: "Risk Assessment Completed",
    date: "OCT 14, 2023 • 11:20 AM",
    description:
      "Automated AI evaluation score: 84/100",
    active: false,
  },
  {
    title: "Team Review Started",
    date: "OCT 15, 2023 • 08:00 AM",
    description:
      "Cross-functional review process initiated.",
    active: false,
  },
  {
    title: "Pending Executive Approval",
    date: "CURRENT",
    description:
      "Awaiting final approval from leadership.",
    active: false,
  },
];

export default function ActivityTimeline() {
  return (
    <section className="space-y-8">
      <h3 className="text-2xl font-semibold">
        Activity Timeline
      </h3>

      <div className="relative pl-10">
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-zinc-200" />

        <div className="space-y-10">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
              }}
              className="relative"
            >
              <div
                className={`absolute -left-[31px] top-2 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
                  item.active
                    ? "bg-black"
                    : "bg-zinc-400"
                }`}
              />

              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h4 className="font-semibold text-lg">
                    {item.title}
                  </h4>

                  <span className="text-xs tracking-widest text-zinc-500">
                    {item.date}
                  </span>
                </div>

                <p className="text-zinc-600 leading-7">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}