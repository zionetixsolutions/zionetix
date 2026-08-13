"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  show: boolean;
  title?: string;
  message?: string;
}


export default function SuccessToast({
  show,
  title = "Decision Approved",
  message = "Status updated successfully",
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            x: 100,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: 100,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            fixed
            top-24
            right-8
            z-[999]
          "
        >
          <div
            className="
              bg-white/95
              backdrop-blur-xl
              border
              border-green-100
              shadow-xl
              rounded-2xl
              px-4
              py-3
              min-w-[260px]
            "
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 400,
                }}
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-green-100
                  flex
                  items-center
                  justify-center
                "
              >
                <Check
                  size={18}
                  className="text-green-600"
                />
              </motion.div>

              <div>
                <p className="font-semibold text-sm text-zinc-900">
                 {title}
                </p>

                <p className="text-xs text-zinc-500">
                 {message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}