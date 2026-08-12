"use client";

import { Download, Loader2 } from "lucide-react";

interface ExportButtonProps {
  onClick?: () => void;
  loading?: boolean;
}

export default function ExportButton({
  onClick,
  loading = false,
}: ExportButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-black
        px-5
        py-2.5
        text-xs
        font-semibold
        uppercase
        tracking-wider
        text-white
        transition-all
        duration-200
        hover:bg-zinc-800
        hover:shadow-lg
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <Loader2
          size={16}
          className="animate-spin"
        />
      ) : (
        <Download size={16} />
      )}

      {loading ? "Exporting..." : "Export Logs"}
    </button>
  );
}