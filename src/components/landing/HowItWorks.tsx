"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    text: "Tell Primordial what you're building.",
  },
  {
    number: "02",
    text: "Your AI team drafts a plan — architecture, ICP, structure, numbers.",
  },
  {
    number: "03",
    text: "Invite your manual team. Hand off, approve, comment — in one workspace.",
  },
  {
    number: "04",
    text: "Ship documents and decisions you can defend.",
  },
];

export default function HowItWorks() {
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
        >

          <p
            className="
              text-[10px]
              tracking-[0.35em]
              uppercase
              text-zinc-500
              mb-20
            "
          >
            How It Works
          </p>

          <div className="space-y-14">

            {steps.map((step) => (

              <div
                key={step.number}
                className="
                  grid
                  grid-cols-[60px_1fr]
                  gap-8
                  items-start
                "
              >

                <span
                  className="
                    text-sm
                    text-zinc-400
                  "
                >
                  {step.number}
                </span>

                <p
                  className="
                    text-[24px]
                    leading-[1.6]
                    text-black
                    max-w-4xl
                  "
                >
                  {step.text}
                </p>

              </div>

            ))}

          </div>

          <div className="mt-24">

            <button
              className="
                text-black
                text-sm
                border-b
                border-black
                pb-1
                hover:opacity-70
                transition-all
                duration-300
              "
            >
              Read the full walkthrough →
            </button>

          </div>

        </motion.div>

      </div>
    </section>
  );
}