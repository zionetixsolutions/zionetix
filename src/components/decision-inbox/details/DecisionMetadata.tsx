"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function DecisionMetadata() {
  return (
    <motion.section
      whileHover={{ y: -3 }}
      className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm"
    >
      <div className="space-y-6">
        {/* Created By */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">
            Created By
          </p>

          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="Founder"
              className="w-10 h-10 rounded-full object-cover border border-zinc-200"
            />

            <div>
              <h4 className="font-semibold">
                John Founder
              </h4>

              <p className="text-sm text-zinc-500">
                CEO
              </p>
            </div>
          </div>
        </div>

        {/* Created Date */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
            Created Date
          </p>

          <p className="font-medium">
            October 14, 2023
          </p>
        </div>

        {/* Updated */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
            Last Updated
          </p>

          <p className="font-medium">
            Oct 15, 2023 • 08:30 AM
          </p>
        </div>

        {/* Workspace */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
            Workspace
          </p>

          <p className="font-medium underline underline-offset-4">
            Series A Preparation
          </p>
        </div>

        {/* Document */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
            Document
          </p>

          <div className="flex items-center gap-2">
            <FileText size={18} />

            <span className="font-medium underline underline-offset-4">
              Expansion_Proposal_v3.pdf
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}