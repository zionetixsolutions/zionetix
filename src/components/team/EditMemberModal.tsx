"use client";

import { useState, useEffect } from "react";
interface TeamMember {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  role: string;
}
interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
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
    setFullName(member.full_name);
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md p-6">

        <h2 className="text-xl font-bold text-white mb-6">
          Edit Member
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white"
          >
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="flex-1 bg-zinc-700 text-white py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={updateMember}
              className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-semibold"
            >
              Update
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}