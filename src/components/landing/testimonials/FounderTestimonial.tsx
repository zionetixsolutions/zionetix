"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FounderTestimonial() {
  return (
    <section className="bg-[#f7f7f3] border-b border-neutral-200">

      <div className="max-w-'1200px' mx-auto px-6 lg:px-10 py-28">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

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
              Our First Testimonial
            </p>

            <h2 className="text-[52px] md:text-[76px] leading-[0.95] font-medium text-black mb-8">
              From the
              founder of
              Primordial.
            </h2>

            <p className="text-[17px] text-neutral-500">
              Why this exists, in his own words.
            </p>

          </motion.div>

          {/* Right */}

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
            className="bg-[#171717] text-white rounded-[28px] p-10 shadow-xl"
          >

            <Quote
              size={22}
              className="text-neutral-500 mb-8"
            />

            <p className="leading-8 text-[16px] text-neutral-200 mb-8">
              I built my first idea completely alone.
              Months of work, no guide, no honest feedback —
              just AI that said yes to everything and one
              human who finally said it was useless.

              <br />
              <br />

              That moment broke something in me.
              But it also showed me exactly what was missing.

              Not another tool.

              Not a chatbot.

              A system that actually knows you,
              challenges you, and travels with you
              from the very first spark.

              <br />
              <br />

              Primordial exists because the zero-to-one
              moment is the loneliest place in the world —
              and nobody should have to face it without
              the right intelligence beside them.
            </p>

            <div className="border-t border-neutral-700 pt-6 flex items-center gap-4">

              <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-medium">
                P
              </div>

              <div>

                <p className="font-medium">
                  Founder, Primordial
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}