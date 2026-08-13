"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface DocumentBreadcrumbProps {
  workspace: string;
  module: string;
  document: string;
}

export default function DocumentBreadcrumb({
  workspace,
  module,
  document,
}: DocumentBreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .35 }}
      className="flex items-center gap-2 text-xs tracking-widest uppercase"
    >
      <span className="text-zinc-400 font-medium">{workspace}</span>

      <ChevronRight size={14} className="text-zinc-300" />

      <span className="text-zinc-400 font-medium">{module}</span>

      <ChevronRight size={14} className="text-zinc-300" />

      <span className="font-semibold text-black">
        {document}
      </span>
    </motion.div>
  );
}