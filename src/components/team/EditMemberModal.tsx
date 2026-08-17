"use client";

import { useState, useEffect } from "react";
import type { Member } from "@/types/member";

type EditableMember = Pick<Member, "member_id" | "role"> & {
  name?: string;
  full_name?: string;
};

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: EditableMember | null;
  onSuccess: () => void;
}

export default function EditMemberModal({
  isOpen,
  onClose,
  member,
  onSuccess,
}: EditMemberModalProps) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

 useEffect(() => {
  if (!member) return;

  const syncMember = () => {
    setFullName(member.name ?? member.full_name ?? "");
    setRole(member.role);
  };

  syncMember();
}, [member]);

  if (!isOpen) return null;

  const updateMember = async () => {
  if (!member) return;

  try {
    const response = await fetch(
      `/api/team/member/${member.member_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          role,
        }),
      }
    );

      const data = await response.json();

      if (data.success) {
        alert("Member Updated Successfully");
        onSuccess();
        onClose();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div
      className="
        w-full
        max-w-lg
        max-h-[80vh]
        overflow-hidden
        rounded-2xl
        border border-zinc-800
        bg-zinc-900
        shadow-2xl
      "
    >
      {/* Scrollable Content */}
      <div className="max-h-[80vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 px-6 pt-6 pb-4 border-b border-zinc-800 z-10">
          <h2 className="text-xl font-semibold text-white">
            Edit Member
          </h2>

          <p className="text-sm text-zinc-400 mt-1">
            Update member information.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="
                w-full
                rounded-lg
                border border-zinc-700
                bg-zinc-800
                px-4
                py-3
                text-white
                outline-none
                focus:border-yellow-400
              "
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="
                w-full
                rounded-lg
                border border-zinc-700
                bg-zinc-800
                px-4
                py-3
                text-white
                outline-none
                focus:border-yellow-400
              "
            >
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Dummy fields to demonstrate scrolling */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
              Department
            </label>

            <input
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
              placeholder="Engineering"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
              Email
            </label>

            <input
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
              placeholder="john@example.com"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 accent-yellow-400"
            />

            <span className="text-sm text-zinc-300">
              Active Member
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="
                flex-1
                rounded-lg
                border
                border-zinc-700
                py-3
                text-white
                hover:bg-zinc-800
              "
            >
              Cancel
            </button>

            <button
              onClick={updateMember}
              className="
                flex-1
                rounded-lg
                bg-yellow-400
                py-3
                font-semibold
                text-black
                hover:bg-yellow-300
              "
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}
