"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  User,
  Mail,
  Briefcase,
  UserPlus,
} from "lucide-react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  workspaceId,
}: AddMemberModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Developer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createMember() {
    setError("");

    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/workspaces/${workspaceId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName.trim(),
            email: email.trim(),
            role: role.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to add team member"
        );
      }

      setFullName("");
      setEmail("");
      setRole("Developer");

      onClose();

      window.location.reload();
    } catch (error) {
      console.error(
        "Create Member Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to add team member"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!loading) {
                onClose();
              }
            }}
            className="fixed inset-0 z-50 bg-black"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 25,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed
              left-1/2
              top-1/2
              z-50
              w-full
              max-w-xl
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <div className="rounded-3xl border border-zinc-200 bg-white shadow-2xl">

              {/* Header */}

              <div className="flex items-start justify-between border-b p-7">
                <div>
                  <h2 className="text-2xl font-bold">
                    Add Team Member
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Invite a new member to your workspace.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="
                    rounded-xl
                    p-2
                    hover:bg-zinc-100
                    transition
                    disabled:opacity-50
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}

              <div className="space-y-6 p-7">

                {/* Full Name */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <User size={16} />
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="John Founder"
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-zinc-200
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-black
                      disabled:bg-zinc-50
                    "
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Mail size={16} />
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="john@company.com"
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-zinc-200
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-black
                      disabled:bg-zinc-50
                    "
                  />
                </div>

                {/* Role */}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Briefcase size={16} />
                    Role
                  </label>

                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-zinc-200
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-black
                      disabled:bg-zinc-50
                    "
                  >
                    <option value="Founder">
                      Founder
                    </option>

                    <option value="Administrator">
                      Administrator
                    </option>

                    <option value="Manager">
                      Manager
                    </option>

                    <option value="Developer">
                      Developer
                    </option>

                    <option value="Designer">
                      Designer
                    </option>

                    <option value="Editor">
                      Editor
                    </option>

                    <option value="Viewer">
                      Viewer
                    </option>
                  </select>
                </div>

                {/* Error */}

                {error && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      text-red-600
                    "
                  >
                    {error}
                  </div>
                )}
              </div>

              {/* Footer */}

              <div className="flex justify-end gap-3 border-t p-6">

                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="
                    rounded-xl
                    border
                    border-zinc-200
                    px-6
                    py-3
                    font-medium
                    hover:bg-zinc-50
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={createMember}
                  disabled={loading}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-black
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-zinc-800
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <UserPlus size={17} />

                  {loading
                    ? "Creating..."
                    : "Create Member"}
                </button>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}