"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  User,
  Mail,
  Lock,
  Briefcase,
  UserPlus,
} from "lucide-react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onSuccess,
}: AddMemberModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Developer");

  const createMember = async () => {
    try {
      const response = await fetch("/api/team/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFullName("");
        setEmail("");
        setPassword("");
        setRole("Developer");

        onClose();
        onSuccess?.();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                  onClick={onClose}
                  className="rounded-xl p-2 hover:bg-zinc-100 transition"
                >
                  <X size={18} />
                </button>

              </div>

              {/* Body */}

              <div className="space-y-6 p-7">

                {/* Name */}

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
                    className="
                      w-full
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-black
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
                    className="
                      w-full
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-black
                    "
                  />

                </div>

                {/* Password */}

                <div>

                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                    <Lock size={16} />

                    Temporary Password

                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="
                      w-full
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-black
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
                    className="
                      w-full
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-black
                    "
                  >
                    <option>Founder</option>
                    <option>Administrator</option>
                    <option>Manager</option>
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>

                </div>

              </div>

              {/* Footer */}

              <div className="flex justify-end gap-3 border-t p-6">

                <button
                  onClick={onClose}
                  className="
                    rounded-xl
                    border
                    px-6
                    py-3
                    font-medium
                    hover:bg-zinc-50
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={createMember}
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
                  "
                >
                  <UserPlus size={17} />
                  Create Member
                </button>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
