"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DeleteBrainMapModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0
      bg-black/20
      backdrop-blur-md
      flex items-center justify-center
      z-50
      "
    >
      <div
        className="
        w-[430px]
        bg-white
        rounded-3xl
        p-8
        "
      >
        <div className="flex justify-center">
          <AlertTriangle
            size={42}
            className="text-red-500"
          />
        </div>

        <h2
          className="
          mt-4
          text-center
          text-3xl
          font-semibold
          "
        >
          Delete Brain Map?
        </h2>

        <p
          className="
          mt-4
          text-center
          text-zinc-500
          "
        >
          This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="
            flex-1
            h-12
            border
            rounded-xl
            "
          >
            Cancel
          </button>

          <button
            className="
            flex-1
            h-12
            bg-red-500
            text-white
            rounded-xl
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}