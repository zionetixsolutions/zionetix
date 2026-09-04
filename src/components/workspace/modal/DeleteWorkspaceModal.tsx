"use client";

import {
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

interface DeleteWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  workspaceName: string;
  onDelete: () => void;
  deleting?: boolean;
}

export default function DeleteWorkspaceModal({
  open,
  onClose,
  workspaceName,
  onDelete,
  deleting = false,
}: DeleteWorkspaceModalProps) {
  const [confirmed, setConfirmed] =
    useState(false);

  if (!open) {
    return null;
  }

  function handleClose() {
    if (deleting) {
      return;
    }

    setConfirmed(false);
    onClose();
  }

  function handleDelete() {
    if (!confirmed || deleting) {
      return;
    }

    onDelete();
  }

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

          {/* ICON */}

          <div className="flex justify-center">
            <div
              className="
                w-16
                h-16
                rounded-full
                bg-red-50
                flex
                items-center
                justify-center
              "
            >
              <AlertTriangle
                size={30}
                className="text-red-500"
              />
            </div>
          </div>

          {/* TITLE */}

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

          {/* DESCRIPTION */}

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
            delete{" "}
            <span className="font-semibold text-zinc-900">
              {workspaceName}
            </span>
            ?

            <br />

            This action cannot be undone.
            All workspace data will be removed.
          </p>

          {/* CONFIRMATION */}

          <div
            className="
              mt-8
              border
              border-red-100
              bg-red-50
              rounded-2xl
              p-4
            "
          >
            <label
              className={`
                flex
                gap-3
                ${
                  deleting
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }
              `}
            >
              <input
                type="checkbox"
                checked={confirmed}
                disabled={deleting}
                onChange={(event) =>
                  setConfirmed(
                    event.target.checked
                  )
                }
                className="
                  mt-0.5
                  h-4
                  w-4
                "
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

          {/* ACTIONS */}

          <div className="flex gap-4 mt-8">

            {/* CANCEL */}

            <button
              type="button"
              disabled={deleting}
              onClick={handleClose}
              className="
                flex-1
                h-14
                border
                border-zinc-200
                rounded-2xl
                font-medium
                hover:bg-zinc-50
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Cancel
            </button>

            {/* DELETE */}

            <button
              type="button"
              disabled={
                !confirmed ||
                deleting
              }
              onClick={handleDelete}
              className="
                flex-1
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-red-500
                to-red-400
                text-white
                font-medium
                flex
                items-center
                justify-center
                gap-2
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
            >
              {deleting
                ? "Deleting..."
                : "Delete Workspace"}

              {!deleting && (
                <ArrowRight size={16} />
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}