"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Document } from "@/types/document";

import ShareDocumentModal from "./modals/ShareDocumentModal";
import DocumentsHeader from "./header/DocumentsHeader";
import DocumentEditor from "./editor/DocumentEditor";

import DocumentInfo from "./sidebar/DocumentInfo";
import AIInsights from "./sidebar/AIInsights";
import RecentActivity from "./sidebar/RecentActivity";

import VersionHistoryDrawer from "./drawers/VersionHistoryDrawer";

interface DocumentDetailsProps {
  document: Document;
  onBack: () => void;
}

export default function DocumentDetails({
  document,
  onBack,
}: DocumentDetailsProps) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <ShareDocumentModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />

      <VersionHistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          mx-auto
          max-w-[1800px]
          px-8
          py-8
        "
      >
        <DocumentsHeader
  document={document}
  onBack={onBack}
  onHistory={() => setHistoryOpen(true)}
  onShare={() => setShareOpen(true)}
/>

        <div
          className="
            mt-8
            grid
            grid-cols-12
            gap-8
          "
        >
          <div className="col-span-8">
            <DocumentEditor />
          </div>

          <div
            className="
              col-span-4
              space-y-6
            "
          >
            <DocumentInfo />
            <AIInsights />
            <RecentActivity />
          </div>
        </div>
      </motion.div>
    </>
  );
}