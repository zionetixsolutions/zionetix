"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import DocumentBreadcrumb from "./DocumentBreadcrumb";
import DocumentActions from "./DocumentActions";

import type { Document } from "@/types/document";

interface DocumentsHeaderProps {
  document: Document;
  onBack: () => void;
  onHistory: () => void;
  onShare: () => void;
}

export default function DocumentsHeader({
  document,
  onBack,
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
        duration: 0.45,
      }}
      className="border-b border-zinc-200 pb-8"
    >
      <div className="flex flex-col xl:flex-row justify-between gap-8">
        {/* LEFT */}

        <div className="space-y-4">
          {/* Back */}

          <button
            type="button"
            onClick={onBack}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-zinc-500
              hover:text-zinc-900
              transition
            "
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* Breadcrumb */}

          <DocumentBreadcrumb
            workspace="Workspace"
            module="Documents"
            document={document.title}
          />

          {/* Status */}

          <div className="flex items-center gap-3">
            <span
              className="
                px-3
                py-1
                rounded-full
                bg-zinc-100
                text-xs
                font-semibold
              "
            >
              {document.status}
            </span>

            <span className="text-xs text-zinc-400">
              {document.version}
            </span>

            <span className="text-xs text-zinc-400">
              Saved {document.lastSaved}
            </span>
          </div>

          {/* Title */}

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {document.title}
            </h1>

            <p className="mt-2 text-zinc-500 max-w-2xl">
              {document.description}
            </p>
          </div>
        </div>

        {/* RIGHT */}

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