"use client";

import { motion } from "framer-motion";

import EditorToolbar from "./EditorToolbar";
import EditorSection from "./EditorSection";

const sections = [
  {
    title: "Executive Summary",
    content:
      "The Q4 Market Analysis outlines the strategic positioning of Primordial within the emerging AI Venture Infrastructure ecosystem.",
  },
  {
    title: "Problem Statement",
    content:
      "Current startup founders rely on fragmented tools for planning, execution and documentation.",
  },
  {
    title: "Vision & Strategy",
    content:
      "Build the world's first AI Operating System for Venture Creation.",
  },
  {
    title: "Market Research",
    content:
      "The market opportunity exceeds $42B globally with rapid AI adoption.",
  },
  {
    title: "Competitive Analysis",
    content:
      "Traditional platforms provide document storage. Primordial provides intelligent company memory.",
  },
];

export default function DocumentEditor() {
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
        duration: .4,
      }}
      className="space-y-6"
    >
      <EditorToolbar />

      {sections.map((section) => (
        <EditorSection
          key={section.title}
          title={section.title}
          content={section.content}
        />
      ))}
    </motion.div>
  );
}