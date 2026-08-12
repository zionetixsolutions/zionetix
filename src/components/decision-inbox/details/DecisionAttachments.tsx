"use client";

import { motion } from "framer-motion";
import {
  Paperclip,
  FileSpreadsheet,
  ImageIcon,
  Download,
} from "lucide-react";

const attachments = [
  {
    id: 1,
    name: "Budget_Allocations.xlsx",
    icon: FileSpreadsheet,
  },
  {
    id: 2,
    name: "EU_Market_Heatmap.png",
    icon: ImageIcon,
  },
];

export default function DecisionAttachments() {
  return (
    <motion.section
      whileHover={{ y: -3 }}
      className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <Paperclip size={18} />
        <h3 className="font-semibold text-lg">
          Attachments
        </h3>
      </div>

      <div className="space-y-3">
        {attachments.map((file) => {
          const Icon = file.icon;

          return (
            <motion.div
              key={file.id}
              whileHover={{
                scale: 1.02,
              }}
              className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 bg-zinc-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  className="text-zinc-600"
                />

                <span className="font-medium text-sm">
                  {file.name}
                </span>
              </div>

              <Download
                size={18}
                className="text-zinc-500"
              />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}