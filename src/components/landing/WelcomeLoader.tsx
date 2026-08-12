"use client";

import { motion } from "framer-motion";

export default function WelcomeLoader() {
  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        fixed
        inset-0
        z-'9999'
        bg-white
        flex
        items-center
        justify-center
      "
    >
      <div className="text-center">

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-3xl
            md:text-5xl
            font-semibold
            tracking-[0.3em]
            text-black
          "
        >
          PRIMORDIAL
        </motion.h1>

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: "220px",
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="
            h-'2px'
            bg-orange-500
            mx-auto
            mt-8
          "
        />

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="
            text-zinc-500
            text-sm
            mt-6
            tracking-wide
          "
        >
          Building your AI team...
        </motion.p>

      </div>
    </motion.div>
  );
}