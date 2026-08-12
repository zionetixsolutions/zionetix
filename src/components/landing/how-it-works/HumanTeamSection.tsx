"use client";

import { motion } from "framer-motion";

const members = [
  {
    name: "AI Tech Lead",
    role: "Architecture",
    status: "ACTIVE",
  },
  {
    name: "AI Market Lead",
    role: "Positioning",
    status: "ACTIVE",
  },
  {
    name: "Jane Doe",
    role: "Co-founder",
    status: "HUMAN",
  },
  {
    name: "AI Legal Advisor",
    role: "Structure",
    status: "ACTIVE",
  },
  {
    name: "AI Finance Advisor",
    role: "Narrative",
    status: "ACTIVE",
  },
  {
    name: "Sam Patel",
    role: "Design contractor",
    status: "HUMAN",
  },
];

const benefits = [
  "Invite your manual team by email — full or guest access",
  "AI employees and your manual team see the same shared memory",
  "Hand off any task between an AI employee and a person",
  "One decision log, one source of truth, one team",
];

export default function HumanTeamSection() {
  return (
    <section className="bg-[#f7f7f3] border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}

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
          >

            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mb-8">
              Plus Your Own People
            </p>

            <h2 className="text-[42px] md:text-[64px] leading-'1' font-medium text-black mb-8">
              AI employees,
              with your manual team alongside.
            </h2>

            <p className="text-[16px] leading-8 text-neutral-600 mb-10 max-w-'600px'">
              The four AI employees are always-on core.
              But Primordial is a workspace, not a chatbot —
              invite a co-founder, contractor, designer,
              or advisor. They sit at the same table,
              share the same memory, and ship from the same plan.
            </p>

            <div className="space-y-4">

              {benefits.map((item) => (

                <div
                  key={item}
                  className="flex items-start gap-3"
                >

                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-3 shrink-0" />

                  <p className="text-[15px] leading-7 text-neutral-600">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </motion.div>

          {/* Right Side */}

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
              delay: 0.15,
            }}
            className="bg-white border border-neutral-200 rounded-[28px] p-8"
          >

            <div className="flex justify-between items-center mb-8">

              <div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Members
                </p>

                <h3 className="text-lg font-medium text-black mt-2">
                  Shared Workspace
                </h3>

              </div>

            </div>

            <div className="space-y-4">

              {members.map((member) => (

                <div
                  key={member.name}
                  className="flex items-center justify-between border-b border-neutral-100 pb-4"
                >

                  <div>

                    <p className="text-black font-medium">
                      {member.name}
                    </p>

                    <p className="text-sm text-neutral-500">
                      {member.role}
                    </p>

                  </div>

                  <span
                    className={`text-[10px] px-3 py-1 rounded-full font-medium ${
                      member.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {member.status}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}