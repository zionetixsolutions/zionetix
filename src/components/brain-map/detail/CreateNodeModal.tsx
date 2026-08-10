"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateNodeModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0
      bg-black/20
      backdrop-blur-sm
      flex items-center justify-center
      z-50
      "
    >
      <div
        className="
        w-[560px]
        bg-white
        rounded-3xl
        p-8
        "
      >
        <h2 className="text-3xl font-semibold">
          Create Node
        </h2>

        <input
          placeholder="Node Name"
          className="
          mt-6
          w-full
          h-12
          border
          rounded-xl
          px-4
          "
        />

        <textarea
          placeholder="Description"
          className="
          mt-4
          w-full
          h-32
          border
          rounded-xl
          p-4
          "
        />

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>
            Cancel
          </button>

          <button
            className="
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}