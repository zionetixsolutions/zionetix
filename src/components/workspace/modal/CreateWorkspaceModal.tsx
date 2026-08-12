"use client";

import { X } from "lucide-react";
import WorkspaceForm from "./WorkspaceForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateWorkspaceModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0
      z-[999]
      flex items-center justify-center
      bg-black/20
      backdrop-blur-[2px]
      "
    >
      <div
        className="
        bg-white
        rounded-3xl
        shadow-2xl
        w-[460px]
        h-[620px]
        overflow-hidden
        "
      >
        <div
          className="
          flex items-start justify-between
          px-6 py-6
          border-b
          "
        >
          <div>
            <h2 className="text-[18px] font-semibold">
              Create Workspace
            </h2>

            <p className="text-[13px] text-zinc-500 mt-1">
              Create a new workspace for your venture.
            </p>
          </div>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <WorkspaceForm onClose={onClose} />
      </div>
    </div>
  );
}