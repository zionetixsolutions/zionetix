"use client";

import EditWorkspaceForm from "./EditWorkspaceForm";

import { WorkspaceDetail } from "@/types/workspace";

interface Props {
  open: boolean;
  onClose: () => void;
  workspace: WorkspaceDetail;
}

export default function EditWorkspaceModal({
  open,
  onClose,
  workspace,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0
        z-[999]
        flex items-center justify-center
        bg-black/20
        backdrop-blur-[4px]
      "
    >
      <EditWorkspaceForm
        workspace={workspace}
        onClose={onClose}
      />
    </div>
  );
}