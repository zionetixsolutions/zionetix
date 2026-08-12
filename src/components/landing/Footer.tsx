"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-8 py-20">

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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">

            <div>

              <h2
                className="
                  text-sm
                  tracking-[0.3em]
                  font-semibold
                  text-black
                "
              >
                PRIMORDIAL
              </h2>

            </div>

            <div>

              <h3
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-zinc-400
                  mb-6
                "
              >
                Company
              </h3>

              <div className="space-y-4">

                <button className="block text-black hover:opacity-70 transition-all">
                  About
                </button>

                <button className="block text-black hover:opacity-70 transition-all">
                  Public
                </button>

                <button className="block text-black hover:opacity-70 transition-all">
                  Contact
                </button>

              </div>

            </div>

            <div>

              <h3
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-zinc-400
                  mb-6
                "
              >
                Resources
              </h3>

              <div className="space-y-4">

                <button className="block text-black hover:opacity-70 transition-all">
                  How it works
                </button>

                <button className="block text-black hover:opacity-70 transition-all">
                  Feedback
                </button>

                <button className="block text-black hover:opacity-70 transition-all">
                  Privacy
                </button>

              </div>

            </div>

            <div>

              <h3
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-zinc-400
                  mb-6
                "
              >
                Social
              </h3>

              <div className="space-y-4">

                <button className="block text-black hover:opacity-70 transition-all">
                  X / Twitter
                </button>

                <button className="block text-black hover:opacity-70 transition-all">
                  LinkedIn
                </button>

              </div>

            </div>

          </div>

          <div
            className="
              border-t
              border-zinc-200
              mt-16
              pt-8
              flex
              justify-between
              items-center
            "
          >

            <p className="text-sm text-zinc-400">
              © 2026 Primordial
            </p>

          </div>

        </motion.div>

      </div>
    </footer>
  );
}