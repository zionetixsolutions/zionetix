"use client";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function FilterChip({
  label,
  active = false,
  onClick,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        whitespace-nowrap
        rounded-full
        border
        px-4
        py-2
        text-xs
        font-semibold
        uppercase
        tracking-wider
        transition-all
        duration-200
        active:scale-95

        ${
          active
            ? "border-black bg-black text-white shadow-sm"
            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-black"
        }
      `}
    >
      {label}
    </button>
  );
}