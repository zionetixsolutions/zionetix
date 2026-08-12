"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  FileEdit,
  Share2,
  Download,
} from "lucide-react";

interface DecisionActionsProps {
  onApprove: () => void;
  onRejectClick: () => void;
  onRequestChanges: () => void;
}

export default function DecisionActions({
  onApprove,
  onRejectClick,
  onRequestChanges,
}: DecisionActionsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm"
    >
      <div className="space-y-3">
        <button
          onClick={onApprove}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-2xl font-medium hover:opacity-90 transition"
        >
          <CheckCircle2 size={18} />
          Approve Decision
        </button>

        <button
          onClick={onRejectClick}
          className="w-full flex items-center justify-center gap-2 border border-zinc-200 bg-white py-3 rounded-2xl font-medium hover:bg-zinc-50 transition"
        >
          <XCircle size={18} />
          Reject Decision
        </button>

        <button onClick={onRequestChanges} className="w-full flex items-center justify-center gap-2 border border-zinc-200 bg-white py-3 rounded-2xl font-medium hover:bg-zinc-50 transition"
        >
         <FileEdit size={18} />
           Request Changes
         </button>
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-zinc-600 hover:text-black transition">
            <Share2 size={18} />
            <span className="text-xs uppercase tracking-widest font-semibold">
              Share
            </span>
          </button>

          <button className="flex items-center gap-2 text-zinc-600 hover:text-black transition">
            <Download size={18} />
            <span className="text-xs uppercase tracking-widest font-semibold">
              Export
            </span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}