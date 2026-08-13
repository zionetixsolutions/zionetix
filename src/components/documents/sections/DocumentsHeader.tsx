"use client";

import { motion } from "framer-motion";

export default function DocumentsHeader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <h1
        className="
        text-3xl
        font-bold
        tracking-tight
        text-zinc-900
        "
      >
        Documents
      </h1>

      <p
        className="
        mt-2
        text-sm
        text-zinc-500
        "
      >
        Manage, edit and organize your venture
        documentation in one centralized workspace.
      </p>
    </motion.div>
  );
}