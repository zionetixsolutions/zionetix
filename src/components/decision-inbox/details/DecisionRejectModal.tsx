"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onReject: () => void;
}

export default function DecisionRejectModal({
  open,
  onClose,
  onReject,
}: Props) {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleReject = () => {
    if (!reason.trim()) return;

    onReject();
    onClose();

    setReason("");
    setFeedback("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            onClick={onClose}
          />

          {/* Modal */}

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
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed left-1/2 top-1/2 z-[1000] w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
          >
            <div className=" bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[75vh] flex flex-col">
              {/* Header */}

              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-xl">
                      Reject Decision
                    </h2>

                    <p className="text-sm text-zinc-500 mt-2">
                      Rejecting this decision will update
                      its status and notify stakeholders.
                    </p>
                  </div>

                  <button onClick={onClose}>
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}

              <div className="p-6 space-y-5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-zinc-300">
                <div className="bg-zinc-50 border rounded-2xl p-3">
                  <div className="flex justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700">
                      Strategic
                    </span>

                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-lg font-bold">
                      High Priority
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mt-3">
                    Series A Expansion Strategy
                  </h3>

                  <p className="text-zinc-500 text-sm mt-2">
                    ● Status: Pending Review
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-2">
                    Reason For Rejection *
                  </label>

                  <textarea
                    rows={3}
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    placeholder="Enter rejection reason..."
                    className="w-full rounded-2xl border p-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-2">
                    Suggestions / Feedback
                  </label>

                  <textarea
                    rows={2}
                    value={feedback}
                    onChange={(e) =>
                      setFeedback(e.target.value)
                    }
                    placeholder="Provide recommendations..."
                    className="w-full rounded-2xl border p-4 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  />
                </div>
              </div>

              {/* Footer */}

              <div className="border-t bg-white p-5 shrink-0">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 border rounded-xl font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleReject}
                    className="px-5 py-2.5 bg-black text-white rounded-xl font-medium"
                  >
                    Reject Decision
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}