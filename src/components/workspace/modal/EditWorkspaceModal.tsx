"use client";

import EditWorkspaceForm from "./EditWorkspaceForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditWorkspaceModal({
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
      backdrop-blur-[4px]
      "
    >
      <EditWorkspaceForm
        onClose={onClose}
      />
    </div>
  );
}