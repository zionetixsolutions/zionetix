"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { Member } from "@/types/member";

interface TeamRemoveModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const removalConsequences = [
  "Revoke workspace access",
  "End active sessions",
  "Remove assigned permissions",
  "Preserve activity logs for auditing",
];

export default function TeamRemoveModal({
  isOpen,
  member,
  onClose,
  onSuccess,
}: TeamRemoveModalProps) {
  if (!member) return null;

  const handleRemove = async () => {
    try {
      const response = await fetch(`/api/team/member/${member.member_id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to remove member");
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("TEAM MEMBER DELETE ERROR:", error);
      alert(error instanceof Error ? error.message : "Failed to remove member");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      Remove Team Member
                    </h2>
                    <p className="text-sm text-neutral-500">
                      This action cannot be undone immediately.
                    </p>
                  </div>
                </div>

                {/* Member */}
                <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex items-center gap-4">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
                        <span className="text-lg font-bold">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-neutral-500">
                        {member.email}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consequences */}
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="mb-3 text-xs font-bold uppercase text-red-600">
                    Removing this member will:
                  </p>

                  <ul className="space-y-2">
                    {removalConsequences.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-neutral-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t bg-neutral-50 px-8 py-5">
                <button
                  onClick={onClose}
                  className="rounded-xl px-5 py-2.5 font-medium text-neutral-700 hover:bg-neutral-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleRemove}
                  className="rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
                >
                  Remove Member
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
