"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function DecisionRequestChangesModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [reason, setReason] = useState("");
  const [changes, setChanges] = useState("");

  const handleSubmit = () => {
    if (!changes.trim()) return;

    onSubmit();
    onClose();

    setReason("");
    setChanges("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            onClick={onClose}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            className="fixed left-1/2 top-1/2 z-[1000] w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[75vh] flex flex-col">
              {/* Header */}

              <div className="p-5 border-b shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Request Changes
                    </h2>

                    <p className="text-sm text-zinc-500 mt-1">
                      Request revisions before this
                      decision can be approved.
                    </p>
                  </div>

                  <button onClick={onClose}>
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Body */}

              <div className="p-5 space-y-5 overflow-y-auto flex-1">
                <div className="bg-zinc-50 border rounded-2xl p-3">
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase bg-black text-white px-2 py-1 rounded">
                      Strategic
                    </span>

                    <span className="text-[10px] font-bold uppercase bg-red-100 text-red-600 px-2 py-1 rounded">
                      High Priority
                    </span>

                    <span className="text-[10px] font-bold uppercase bg-zinc-200 text-zinc-600 px-2 py-1 rounded">
                      Pending Review
                    </span>
                  </div>

                  <h3 className="font-semibold">
                    Series A Expansion Strategy
                  </h3>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">
                    Reason For Revision
                  </label>

                  <select
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                    className="w-full border rounded-xl p-3 bg-white"
                  >
                    <option value="">
                      Select a reason...
                    </option>

                    <option>
                      Missing Information
                    </option>

                    <option>
                      Budget Concerns
                    </option>

                    <option>
                      Timeline Issues
                    </option>

                    <option>
                      Risk Assessment
                    </option>

                    <option>
                      Compliance Review
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">
                    Required Changes
                  </label>

                  <textarea
                    rows={4}
                    value={changes}
                    onChange={(e) =>
                      setChanges(e.target.value)
                    }
                    placeholder="Describe required revisions..."
                    className="w-full border rounded-2xl p-4 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">
                    Due Date (Optional)
                  </label>

                  <div className="flex items-center gap-4">
                    <input
                      type="date"
                      className="border rounded-xl p-3 flex-1"
                    />

                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        defaultChecked
                      />

                      Notify Assignee
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}

              <div className="border-t bg-white p-5 shrink-0">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 border rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2.5 bg-black text-white rounded-xl"
                  >
                    Send Request
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