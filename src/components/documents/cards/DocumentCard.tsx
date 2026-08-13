"use client";

import { motion } from "framer-motion";
import type { Document } from "@/types/document";

interface DocumentCardProps {
  document: Document;
  onOpen: (document: Document) => void;
}

export default function DocumentCard({
  document,
  onOpen,
}: DocumentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold">
        {document.title}
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        {document.description}
      </p>

      <button
        onClick={() => onOpen(document)}
        className="
          mt-6
          w-full
          rounded-xl
          border
          border-zinc-200
          py-3
          text-sm
          font-medium
          hover:bg-zinc-50
          transition
        "
      >
        Open Document
      </button>
    </motion.div>
  );
}