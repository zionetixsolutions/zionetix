"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "left" | "right" | "top" | "bottom";

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function SlideIn({
  children,
 direction = "bottom",
  delay = 0,
  duration = 0.45,
  className,
}: SlideInProps) {
  const offset = 40;

  const variants = {
    left: { x: -offset, y: 0 },
    right: { x: offset, y: 0 },
    top: { x: 0, y: -offset },
    bottom: { x: 0, y: offset },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...variants[direction],
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}