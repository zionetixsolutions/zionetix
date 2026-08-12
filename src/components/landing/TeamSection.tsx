"use client";

import { motion } from "framer-motion";

const teamMembers = [
  {
    title: "AI.Tech Lead",
    description:
      "Architecture before code. A buildable plan, sized for your stage.",
  },
  {
    title: "AI.Market Lead",
    description:
      "Sharpens your wedge. Names your ICP. Drafts the first message.",
  },
  {
    title: "AI.Legal Advisor",
    description:
      "Structure, equity, contracts. Calls out one-way doors.",
  },
  {
    title: "AI.Finance Advisor",
    description:
      "Narrative, runway, capital. The numbers a buyer will ask for.",
  },
  {
    title: "Your manual team",
    description:
      "Co-founders, contractors and advisors — invited by email.",
  },
];

export default function TeamSection() {
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
            The Team
          </p>

          <div className="border-t border-zinc-200">

            {teamMembers.map(
              (member, index) => (

                <div
                  key={index}
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                    py-10
                    border-b
                    border-zinc-200
                  "
                >

                  <div>
                    <h3
                      className="
                        text-[18px]
                        font-medium
                        text-black
                      "
                    >
                      {member.title}
                    </h3>
                  </div>

                  <div>
                    <p
                      className="
                        text-[17px]
                        leading-8
                        text-zinc-500
                      "
                    >
                      {member.description}
                    </p>
                  </div>

                </div>

              )
            )}

          </div>

        </motion.div>

      </div>
    </section>
  );
}