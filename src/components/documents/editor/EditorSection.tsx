"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  content: string;
}

export default function EditorSection({
  title,
  content,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      layout
      className="
      rounded-2xl
      border
      bg-white
      shadow-sm
      overflow-hidden
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
        flex
        w-full
        items-center
        justify-between
        px-6
        py-5
        hover:bg-zinc-50
        "
      >
        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: .25,
            }}
            className="overflow-hidden"
          >
            <textarea
              defaultValue={content}
              className="
              h-56
              w-full
              resize-none
              border-t
              p-6
              text-[15px]
              leading-8
              outline-none
              "
            />
          </motion.div>

        )}

      </AnimatePresence>
    </motion.div>
  );
}