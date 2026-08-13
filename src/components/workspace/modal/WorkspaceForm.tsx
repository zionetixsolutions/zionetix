"use client";

import AdvisorSelector from "./AdvisorSelector";
import VisibilitySelector from "./VisibilitySelector";

interface Props {
  onClose: () => void;
}

export default function WorkspaceForm({
  onClose,
}: Props) {
  return (
    <>
      <div
        className="
        h-[470px]
        overflow-y-auto
        px-6 py-5
        space-y-6
        "
      >
        <div>
          <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider">
            01 Workspace Information
          </p>
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-2">
            Workspace Name *
          </label>

          <input
            placeholder="e.g. Project Aether"
            className="
            w-full
            h-11
            rounded-xl
            border
            border-zinc-200
            px-4
            text-sm
            "
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-2">
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Briefly describe the venture's objectives..."
            className="
            w-full
            rounded-xl
            border
            border-zinc-200
            p-4
            resize-none
            text-sm
            "
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium mb-2">
              Category
            </label>

            <select
              className="
              w-full
              h-11
              rounded-xl
              border
              border-zinc-200
              px-4
              text-sm
              "
            >
              <option>Strategic Venture</option>
            </select>
          </div>

          <VisibilitySelector />
        </div>

        <div>
          <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider mb-4">
            02 Enable AI Advisors
          </p>

          <AdvisorSelector />
        </div>
      </div>

      <div
        className="
        h-[68px]
        border-t
        px-6
        flex items-center justify-end gap-4
        "
      >
        <button
          onClick={onClose}
          className="
          text-sm
          text-zinc-600
          "
        >
          Cancel
        </button>

        <button
          className="
          h-10
          px-5
          rounded-full
          bg-black
          text-white
          text-sm
          font-medium
          "
        >
          Create Workspace →
        </button>
      </div>
    </>
  );
}