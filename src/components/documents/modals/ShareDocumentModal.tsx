"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ShareDocumentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ShareDocumentModal({
  open,
  onClose,
}: ShareDocumentModalProps) {
  const [copied, setCopied] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black"
          />

          {/* Modal */}

          <motion.div
  initial={{
    opacity: 0,
    scale: 0.96,
    y: 20,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  exit={{
    opacity: 0,
    scale: 0.96,
    y: 20,
  }}
  transition={{
    duration: 0.25,
  }}
  className="
    fixed
    left-1/2
    top-1/2
    z-50
    flex
    h-[700px]
    w-[620px]
    -translate-x-1/2
    -translate-y-1/2
    flex-col
    overflow-hidden
    rounded-2xl
    border
    border-zinc-200
    bg-white
    shadow-2xl
"
>
            {/* Header */}

            <div className="border-b border-zinc-200 p-6 shrink-0">
              <div>
                <h2 className="text-2xl font-bold">
                  Share Document
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Invite team members or generate a secure link.
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  rounded-xl
                  p-2
                  transition
                  hover:bg-zinc-100
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              {/* Invite */}

<div className="space-y-3">
  <h3 className="text-sm font-semibold text-zinc-800">
    Invite Team Members
  </h3>

  <div className="flex items-center gap-3">
    <input
      type="email"
      placeholder="Enter email address..."
      className="
        flex-1
        rounded-xl
        border
        border-zinc-200
        px-4
        py-3
        text-sm
        outline-none
        transition
        focus:border-black
      "
    />

    <button
      className="
        rounded-xl
        bg-black
        px-6
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-zinc-800
      "
    >
      Invite
    </button>
  </div>
</div>

              {/* Members */}

              {/* People With Access */}

<div className="space-y-4">
  <h3 className="text-sm font-semibold text-zinc-800">
    People With Access
  </h3>

  <div className="space-y-3">

    {/* Member 1 */}

    <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-3">
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-zinc-900
            text-sm
            font-semibold
            text-white
          "
        >
          JF
        </div>

        <div>
          <h4 className="text-sm font-semibold">
            John Founder
          </h4>

          <p className="text-xs text-zinc-500">
            john@primordial.ai
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2">

        <select
          className="
            rounded-lg
            border
            border-zinc-200
            px-3
            py-2
            text-sm
            outline-none
            focus:border-black
          "
        >
          <option>Owner</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>

        <button
          className="
            rounded-lg
            p-2
            transition
            hover:bg-zinc-100
          "
        >
          ⋮
        </button>

      </div>
    </div>

    {/* Member 2 */}

    <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-3">
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-zinc-200
            text-sm
            font-semibold
          "
        >
          SW
        </div>

        <div>
          <h4 className="text-sm font-semibold">
            Sarah Wilson
          </h4>

          <p className="text-xs text-zinc-500">
            sarah@primordial.ai
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2">

        <select
          className="
            rounded-lg
            border
            border-zinc-200
            px-3
            py-2
            text-sm
            outline-none
            focus:border-black
          "
        >
          <option>Editor</option>
          <option>Viewer</option>
        </select>

        <button
          className="
            rounded-lg
            p-2
            transition
            hover:bg-zinc-100
          "
        >
          ⋮
        </button>

      </div>
    </div>

    {/* Member 3 */}

    <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-3">
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-zinc-200
            text-sm
            font-semibold
          "
        >
          MA
        </div>

        <div>
          <h4 className="text-sm font-semibold">
            Marcus Aurelius
          </h4>

          <p className="text-xs text-zinc-500">
            marcus@primordial.ai
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2">

        <select
          className="
            rounded-lg
            border
            border-zinc-200
            px-3
            py-2
            text-sm
            outline-none
            focus:border-black
          "
        >
          <option>Viewer</option>
          <option>Editor</option>
        </select>

        <button
          className="
            rounded-lg
            p-2
            transition
            hover:bg-zinc-100
          "
        >
          ⋮
        </button>

      </div>
    </div>

  </div>
</div>

              {/* Access */}

              {/* General Access */}

<div className="space-y-3">
  <h3 className="text-sm font-semibold text-zinc-800">
    General Access
  </h3>

  <div
    className="
      flex
      items-center
      justify-between
      rounded-xl
      border
      border-zinc-200
      p-4
    "
  >
    {/* Left */}

    <div>
      <h4 className="text-sm font-medium">
        Workspace Access
      </h4>

      <p className="mt-1 text-xs text-zinc-500">
        Control who can access this document.
      </p>
    </div>

    {/* Right */}

    <select
      className="
        rounded-xl
        border
        border-zinc-200
        bg-white
        px-4
        py-2
        text-sm
        outline-none
        transition
        focus:border-black
      "
    >
      <option>Restricted</option>
      <option>Anyone in Workspace</option>
      <option>Anyone with Link</option>
    </select>
  </div>
</div>

              {/* Link */}

              {/* Share Link */}

<div className="space-y-3">

  <div className="flex items-center justify-between">

    <h3 className="text-sm font-semibold text-zinc-800">
      Share Link
    </h3>

    <button
      className="
        text-xs
        font-medium
        text-zinc-500
        transition
        hover:text-black
      "
    >
      Regenerate
    </button>

  </div>

  <div className="flex gap-3">

    {/* Link */}

    <input
      readOnly
      value="https://primordial.ai/share/doc_92AJKLM"
      className="
        flex-1
        rounded-xl
        border
        border-zinc-200
        bg-zinc-50
        px-4
        py-3
        text-sm
        text-zinc-600
        outline-none
      "
    />

    {/* Copy */}

    <button
  onClick={() => {
    navigator.clipboard.writeText(
      "https://primordial.ai/share/doc_92AJKLM"
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }}
  className="
    min-w-[100px]
    rounded-xl
    border
    border-zinc-200
    px-5
    py-3
    font-medium
    transition
    hover:bg-zinc-100
  "
>
  {copied ? "Copied ✓" : "Copy"}
</button>

  </div>

  <p className="text-xs text-zinc-500">
    Anyone with this link can access the document according to the selected permission.
  </p>

</div>

            </div>

            {/* Footer */}

            <div className="shrink-0 flex items-center justify-end gap-3 border-t border-zinc-200 bg-zinc-50 p-5">
              <button
                onClick={onClose}
                className="
                  rounded-xl
                  px-5
                  py-2.5
                  font-medium
                  hover:bg-zinc-200
                "
              >
                Cancel
              </button>

              <button
                className="
                  rounded-full
                  bg-black
                  px-6
                  py-2.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-zinc-800
                "
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}