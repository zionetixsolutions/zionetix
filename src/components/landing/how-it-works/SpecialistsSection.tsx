"use client";

import { motion } from "framer-motion";

const employees = [
  {
    icon: "🧠",
    title: "AI Tech Lead",
    role: "ARCHITECTURE · SCOPE · SHIPPING",
    description:
      "Designs the system that ships this week and survives next year.",
    color: "bg-blue-50",
  },
  {
    icon: "🎯",
    title: "AI Market Lead",
    role: "POSITIONING · ICP · DEMAND",
    description:
      "Finds the audience that pays — before you spend on reach.",
    color: "bg-pink-50",
  },
  {
    icon: "⚖️",
    title: "AI Legal Advisor",
    role: "STRUCTURE · EQUITY · RISK",
    description:
      "Sets the foundation clean, the first time.",
    color: "bg-yellow-50",
  },
  {
    icon: "📈",
    title: "AI Finance Advisor",
    role: "NARRATIVE · CAPITAL · RUNWAY",
    description:
      "Shapes the story investors fund — and the runway you can deploy.",
    color: "bg-green-50",
  },
];

export default function SpecialistsSection() {
  return (
    <section className="bg-white border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-24">

        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-8">
          Your Four Employees
        </p>

        <h2 className="max-w-'700px' text-[42px] md:text-[64px] leading-'1' font-medium text-black mb-16">
          Each one is a specialist.
          Together, they think as one.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {employees.map(
            (
              employee,
              index
            ) => (

              <motion.div
                key={employee.title}
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
                    index * 0.08,
                }}
                whileHover={{
                  y: -4,
                }}
                className="bg-white border border-neutral-200 rounded-[20px] p-6"
              >

                <div
                  className={`${employee.color} w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-6`}
                >
                  {employee.icon}
                </div>

                <h3 className="text-[22px] font-medium text-black mb-3">
                  {employee.title}
                </h3>

                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">
                  {employee.role}
                </p>

                <p className="text-[14px] leading-7 text-neutral-500">
                  {employee.description}
                </p>

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>
  );
}