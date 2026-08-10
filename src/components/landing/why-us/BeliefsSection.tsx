"use client";

import { motion } from "framer-motion";

const beliefs = [
  {
    number: "01",
    title:
      "The first hundred decisions matter most.",
    description:
      "Stack, ICP, equity, narrative. Get them right and the next two years compound. Get them wrong and you spend the next two years apologizing for them.",
  },
  {
    number: "02",
    title:
      "A founder before the team, needs a team.",
    description:
      "Not a co-pilot. Not a chatbot. A team — four specialists who disagree with each other, push back on you, and ship documents you can defend.",
  },
  {
    number: "03",
    title:
      "Memory is the unfair advantage.",
    description:
      "Every decision held in one continuous context. Nothing starts from zero. Nothing gets re-litigated. Your team in month six knows what you said in week one.",
  },
  {
    number: "04",
    title:
      "Pushback over validation.",
    description:
      "AI that says yes to everything is worse than no AI. Primordial is built to disagree, surface trade-offs and tell you who you're not for.",
  },
];

export default function BeliefsSection() {
  return (
    <section className="bg-[#f7f7f3] border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-28">

        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-10">
          What We Believe
        </p>

        <h2 className="text-[42px] md:text-[64px] leading-'1' font-medium text-black max-w-'700px' mb-16">
          Four beliefs that shaped Primordial.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {beliefs.map(
            (
              belief,
              index
            ) => (

              <motion.div
                key={belief.number}
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
                  delay:
                    index * 0.1,
                }}
                whileHover={{
                  y: -4,
                }}
                className="bg-white border border-neutral-200 rounded-[20px] p-8"
              >

                <p className="text-[11px] text-neutral-400 mb-8">
                  {belief.number}
                </p>

                <h3 className="text-[32px] leading-[1.15] text-black font-medium mb-10">
                  {belief.title}
                </h3>

                <p className="text-[15px] leading-7 text-neutral-500">
                  {
                    belief.description
                  }
                </p>

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>
  );
}