"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import SuccessToast from "@/components/ui/SuccessToast";
import ErrorToast from "@/components/ui/ErrorToast";

import DecisionRejectModal from "./DecisionRejectModal";
import DecisionRequestChangesModal from "./DecisionRequestChangesModal";

import DecisionHeader from "./DecisionHeader";
import ExecutiveSummary from "./ExecutiveSummary";
import BusinessContext from "./BusinessContext";
import ProblemStatement from "./ProblemStatement";
import ProposedDecision from "./ProposedDecision";
import ExpectedImpact from "./ExpectedImpact";
import DiscussionPanel from "./DiscussionPanel";
import ActivityTimeline from "./ActivityTimeline";
import DecisionActions from "./DecisionActions";
import DecisionMetadata from "./DecisionMetadata";
import DecisionAttachments from "./DecisionAttachments";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function DecisionDetailsPage() {
  const [showSuccess, setShowSuccess] =
  useState(false);

const [showRejectModal, setShowRejectModal] =
  useState(false);

const [showRejectedToast, setShowRejectedToast] =
  useState(false);

const [showRequestModal, setShowRequestModal] =
  useState(false);

const [showChangeToast, setShowChangeToast] =
  useState(false);  

 const handleApprove = () => {
  setShowSuccess(true);

  setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
};

const handleReject = () => {
  setShowRejectedToast(true);

  setTimeout(() => {
    setShowRejectedToast(false);
  }, 3000);
};

const handleRequestChanges = () => {
  setShowChangeToast(true);

  setTimeout(() => {
    setShowChangeToast(false);
  }, 3000);
};

  return (
    <>
      {/* APPROVED TOAST */}

      <SuccessToast
        show={showSuccess}
      />

      {/* REJECTED TOAST */}

      <ErrorToast
        show={showRejectedToast}
      />

      {/* REJECT MODAL */}

      <DecisionRejectModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onReject={handleReject}
      />
{/* APPROVE TOAST */}

<SuccessToast
  show={showSuccess}
  title="Decision Approved"
  message="Status updated successfully"
/>

{/* CHANGE REQUEST TOAST */}

<SuccessToast
  show={showChangeToast}
  title="Change Request Sent"
  message="Assignee notified successfully"
/>

{/* REJECT TOAST */}

<ErrorToast
  show={showRejectedToast}
/>

{/* REJECT MODAL */}

<DecisionRejectModal
  open={showRejectModal}
  onClose={() => setShowRejectModal(false)}
  onReject={handleReject}
/>

{/* REQUEST CHANGES MODAL */}

<DecisionRequestChangesModal
  open={showRequestModal}
  onClose={() => setShowRequestModal(false)}
  onSubmit={handleRequestChanges}
/>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-[1600px] mx-auto px-8 py-8"
      >
        <DecisionHeader />

        <div className="grid grid-cols-12 gap-6 mt-8">
          {/* LEFT CONTENT */}

          <div className="col-span-8 space-y-6">
            <ExecutiveSummary />

            <div className="grid grid-cols-2 gap-6">
              <BusinessContext />
              <ProblemStatement />
            </div>

            <ProposedDecision />

            <ExpectedImpact />

            <DiscussionPanel />

            <ActivityTimeline />
          </div>

          {/* RIGHT SIDEBAR */}

          <div className="col-span-4 space-y-6">
            <DecisionActions
               onApprove={handleApprove}
               onRejectClick={() =>
                setShowRejectModal(true)
                 }
                  onRequestChanges={() =>
                  setShowRequestModal(true)
              }
            />

            <DecisionMetadata />

            <DecisionAttachments />
          </div>
        </div>
      </motion.div>
    </>
  );
}