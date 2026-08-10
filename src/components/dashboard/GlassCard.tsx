"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
};

export default function GlassCard({
  children,
}: GlassCardProps) {
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
        duration: 0.5,
      }}
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      className="
      rounded-3xl
      border
      border-white/50
      bg-white/70
      backdrop-blur-xl
      shadow-lg
      transition-all
      "
    >
      {children}
    </motion.div>
  );
}