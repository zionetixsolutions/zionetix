"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import DocumentsHeader from "./sections/DocumentsHeader";
import DocumentsToolbar from "./sections/DocumentsToolbar";
import DocumentsGrid from "./sections/DocumentsGrid";
import RecentActivity from "./sections/RecentActivity";
import DocumentInsights from "./sections/DocumentInsights";

import DocumentDetails from "./DocumentDetails";

import CreateDocumentModal from "./modals/CreateDocumentModal";

import type { Document } from "@/types/document";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Documents() {
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  return (
    <>
      <CreateDocumentModal
        open={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="
          max-w-[1700px]
          mx-auto
          px-8
          py-8
        "
      >
        {/* DOCUMENT LIST */}

        {!selectedDocument ? (
          <>
            {/* HEADER */}

            <DocumentsHeader />

            {/* TOOLBAR */}

            <div className="mt-8">
              <DocumentsToolbar
                onCreate={() =>
                  setShowCreateModal(true)
                }
              />
            </div>

            {/* BODY */}

            <div
              className="
                grid
                grid-cols-12
                gap-8
                mt-8
              "
            >
              {/* LEFT */}

              <div
                className="
                  col-span-8
                  space-y-8
                "
              >
                <DocumentsGrid
                  onOpenDocument={(document) =>
                    setSelectedDocument(document)
                  }
                />

                <RecentActivity />
              </div>

              {/* RIGHT */}

              <div className="col-span-4">
                <DocumentInsights />
              </div>
            </div>
          </>
        ) : (
          /* DOCUMENT DETAILS */

          <DocumentDetails
            document={selectedDocument}
            onBack={() =>
              setSelectedDocument(null)
            }
          />
        )}
      </motion.div>
    </>
  );
}