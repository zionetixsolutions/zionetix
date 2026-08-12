"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateDocumentModal({
  open,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
            fixed
            inset-0
            bg-black/20
            backdrop-blur-sm
            z-50
            "
            onClick={onClose}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            className="
            fixed
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            bg-white
            rounded-3xl
            p-6
            w-full
            max-w-xl
            z-50
            shadow-2xl
            "
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">
                Create Document
              </h2>

              <button onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 mt-6">
              <input
                placeholder="Document Title"
                className="w-full border border-zinc-200 rounded-2xl p-3"
              />

              <input
                placeholder="Owner"
                className="w-full border border-zinc-200 rounded-2xl p-3"
              />

              <textarea
                rows={4}
                placeholder="Description"
                className="w-full border border-zinc-200 rounded-2xl p-3"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="
                px-4
                py-2
                border
                rounded-xl
                "
              >
                Cancel
              </button>

              <button
                className="
                px-5
                py-2
                bg-black
                text-white
                rounded-xl
                "
              >
                Create
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}