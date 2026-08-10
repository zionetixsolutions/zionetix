"use client";

import { AlertTriangle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface DeleteWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  workspaceName: string;
  onDelete: () => void;
}

export default function DeleteWorkspaceModal({
  open,
  onClose,
  workspaceName,
  onDelete,
}: DeleteWorkspaceModalProps) {
  const [confirmed, setConfirmed] =
    useState(false);

  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0 z-[999]
      flex items-center justify-center
      bg-black/20
      backdrop-blur-md
      "
    >
      <div
        className="
        w-[380px]
        bg-white
        rounded-3xl
        shadow-2xl
        overflow-hidden
        "
      >
        <div className="p-8">

          <div className="flex justify-center">
            <div
              className="
              w-16 h-16
              rounded-full
              bg-red-50
              flex items-center justify-center
              "
            >
              <AlertTriangle
                size={30}
                className="text-red-500"
              />
            </div>
          </div>

          <h2
            className="
            text-center
            text-3xl
            font-semibold
            mt-6
            "
          >
            Delete Workspace?
          </h2>

          <p
            className="
            text-center
            text-zinc-600
            text-sm
            leading-7
            mt-4
            "
          >
            Are you sure you want to permanently
            delete this workspace?

            This action cannot be undone.
            All documents, notes, brain maps,
            and activities will be removed.
          </p>

          <div
            className="
            mt-8
            border border-red-100
            bg-red-50
            rounded-2xl
            p-4
            "
          >
            <label className="flex gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={() =>
                  setConfirmed(!confirmed)
                }
              />

              <span
                className="
                text-red-600
                text-sm
                font-medium
                "
              >
                I understand this action
                cannot be undone.
              </span>
            </label>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="
              flex-1
              h-14
              border
              rounded-2xl
              font-medium
              "
            >
              Cancel
            </button>

            <button
              disabled={!confirmed}
              onClick={onDelete}
              className="
              flex-1
              h-14
              rounded-2xl
              bg-gradient-to-r
              from-red-500
              to-red-400
              text-white
              font-medium
              flex items-center
              justify-center
              gap-2
              disabled:opacity-40
              "
            >
              Delete Workspace

              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}