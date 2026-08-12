"use client";

import {
  History,
  Undo2,
  Redo2,
  MoreVertical,
  Share2,
  Save,
} from "lucide-react";

import { motion } from "framer-motion";

interface DocumentActionsProps {
  onHistory: () => void;
  onShare: () => void;
}

export default function DocumentActions({
  onHistory,
  onShare,
}: DocumentActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .25 }}
      className="flex items-center gap-3"
    >
      <button
        onClick={onHistory}
        className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-zinc-100 transition"
      >
        <History size={18} />
        <span className="hidden lg:block font-medium">
          History
        </span>
      </button>

      <button className="p-2 rounded-xl hover:bg-zinc-100 transition">
        <Undo2 size={18} />
      </button>

      <button className="p-2 rounded-xl hover:bg-zinc-100 transition">
        <Redo2 size={18} />
      </button>

      <button 
      onClick={onShare} 
      className="border rounded-xl px-5 py-2.5 hover:bg-zinc-50 transition">
        <div className="flex items-center gap-2">
          <Share2 size={16} />
          Share
        </div>
      </button>

      <motion.button
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: .97,
        }}
        className="bg-black text-white rounded-xl px-6 py-2.5 font-medium flex items-center gap-2"
      >
        <Save size={17} />
        Save Changes
      </motion.button>

      <button className="p-2 rounded-xl hover:bg-zinc-100 transition">
        <MoreVertical size={18} />
      </button>
    </motion.div>
  );
}