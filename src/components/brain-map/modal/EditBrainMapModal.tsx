"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface BrainMapFormData {
  name: string;
  description: string;
  category: string;
  status: string;
  visibility: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialData: BrainMapFormData;
  onSave: (data: BrainMapFormData) => void;
}

export default function EditBrainMapModal({
  open,
  onClose,
  initialData,
  onSave,
}: Props) {
  const [form, setForm] =
    useState<BrainMapFormData>(initialData);

  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/20
      backdrop-blur-md
      p-4
      "
    >
      <div
        className="
        bg-white
        w-[450px]
        max-w-full
        h-[540px]
        rounded-[24px]
        shadow-2xl
        overflow-hidden
        flex
        flex-col
        "
      >
        {/* Header */}

        <div
          className="
          px-7
          py-5
          border-b
          border-zinc-200
          shrink-0
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <h2
                className="
                text-[22px]
                font-semibold
                text-zinc-900
                "
              >
                Edit Brain Map
              </h2>

              <p
                className="
                text-sm
                text-zinc-500
                mt-1
                "
              >
                Update the Brain Map information.
              </p>
            </div>

            <button
              onClick={onClose}
              className="
              text-zinc-500
              hover:text-black
              transition
              "
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}

        <div
          className="
          flex-1
          overflow-y-auto
          px-7
          py-6
          space-y-5
          modal-scroll
          "
        >
          {/* Brain Map Name */}

          <div>
            <label
              className="
              block
              text-[11px]
              uppercase
              tracking-[0.15em]
              text-zinc-500
              mb-2
              "
            >
              Brain Map Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
              w-full
              h-11
              rounded-xl
              border
              border-zinc-200
              px-4
              text-sm
              outline-none
              "
            />
          </div>

          {/* Description */}

          <div>
            <label
              className="
              block
              text-[11px]
              uppercase
              tracking-[0.15em]
              text-zinc-500
              mb-2
              "
            >
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              className="
              w-full
              rounded-xl
              border
              border-zinc-200
              p-4
              text-sm
              resize-none
              outline-none
              "
            />
          </div>

          {/* Category + Status */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="
                block
                text-[11px]
                uppercase
                tracking-[0.15em]
                text-zinc-500
                mb-2
                "
              >
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category:
                      e.target.value,
                  })
                }
                className="
                w-full
                h-11
                rounded-xl
                border
                border-zinc-200
                px-3
                text-sm
                outline-none
                "
              >
                <option>
                  Product Strategy
                </option>
                <option>
                  Marketing
                </option>
                <option>
                  Finance
                </option>
                <option>
                  Operations
                </option>
              </select>
            </div>

            <div>
              <label
                className="
                block
                text-[11px]
                uppercase
                tracking-[0.15em]
                text-zinc-500
                mb-2
                "
              >
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status:
                      e.target.value,
                  })
                }
                className="
                w-full
                h-11
                rounded-xl
                border
                border-zinc-200
                px-3
                text-sm
                outline-none
                "
              >
                <option>
                  Active
                </option>
                <option>
                  Planning
                </option>
                <option>
                  Archived
                </option>
              </select>
            </div>
          </div>

          {/* Visibility */}

          <div>
            <label
              className="
              block
              text-[11px]
              uppercase
              tracking-[0.15em]
              text-zinc-500
              mb-3
              "
            >
              Visibility
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={
                    form.visibility ===
                    "venture"
                  }
                  onChange={() =>
                    setForm({
                      ...form,
                      visibility:
                        "venture",
                    })
                  }
                />
                Venture Wide
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={
                    form.visibility ===
                    "private"
                  }
                  onChange={() =>
                    setForm({
                      ...form,
                      visibility:
                        "private",
                    })
                  }
                />
                Private
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
          border-t
          border-zinc-200
          p-5
          flex
          justify-end
          gap-3
          shrink-0
          bg-white
          "
        >
          <button
            onClick={onClose}
            className="
            h-10
            px-5
            rounded-xl
            border
            border-zinc-200
            text-sm
            "
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave(form)
            }
            className="
            h-10
            px-5
            rounded-xl
            bg-black
            text-white
            text-sm
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}