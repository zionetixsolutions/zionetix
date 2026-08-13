"use client";

import { motion } from "framer-motion";
import DocumentBreadcrumb from "./DocumentBreadcrumb";
import DocumentActions from "./DocumentActions";

interface DocumentsHeaderProps {
  onHistory: () => void;
  onShare:   () => void;
}

export default function DocumentsHeader({
  onHistory,
  onShare,
}: DocumentsHeaderProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .45,
      }}
      className="border-b border-zinc-200 pb-8"
    >
      <div className="flex flex-col xl:flex-row justify-between gap-8">

        {/* Left */}

        <div className="space-y-4">

          <DocumentBreadcrumb
            workspace="Workspace"
            module="Documents"
            document="Market Analysis"
          />

          <div className="flex items-center gap-3">

            <span className="px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold">
              In Progress
            </span>

            <span className="text-xs text-zinc-400">
              v2.4.0
            </span>

            <span className="text-xs text-zinc-400">
              Saved 2m ago
            </span>

          </div>

          <div>

            <h1 className="text-4xl font-bold tracking-tight">
              Market Analysis
            </h1>

            <p className="mt-2 text-zinc-500 max-w-2xl">
              Competitive landscape,
              target personas,
              market sizing,
              investment opportunities
              and strategic recommendations
              for Q4 2026.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-end">

          <DocumentActions
            onHistory={onHistory}
            onShare={onShare}
          />

        </div>

      </div>
    </motion.section>
  );
}