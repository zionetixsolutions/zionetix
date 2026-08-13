"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XCircle } from "lucide-react";

interface Props {
  show: boolean;
}

export default function ErrorToast({
  show,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 100,
          }}
          className="fixed top-24 right-8 z-[999]"
        >
          <div className="bg-white border border-red-200 shadow-xl rounded-2xl px-4 py-3 min-w-[260px]">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"
              >
                <XCircle
                  size={18}
                  className="text-red-600"
                />
              </motion.div>

              <div>
                <p className="font-semibold text-sm">
                  Decision Rejected
                </p>

                <p className="text-xs text-zinc-500">
                  Status updated successfully
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}