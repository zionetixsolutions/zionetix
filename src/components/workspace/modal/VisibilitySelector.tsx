"use client";

export default function VisibilitySelector() {
  return (
    <div>
      <label className="block text-[13px] font-medium mb-2">
        Visibility
      </label>

      <div
        className="
        h-11
        border
        border-zinc-200
        rounded-xl
        grid
        grid-cols-2
        overflow-hidden
        "
      >
        <button
          className="
          bg-white
          text-orange-600
          text-sm
          font-medium
          border-r
          "
        >
          Private
        </button>

        <button
          className="
          text-sm
          text-zinc-500
          "
        >
          Team
        </button>
      </div>
    </div>
  );
}