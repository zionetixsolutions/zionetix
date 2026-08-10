"use client";
import { useState } from "react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMemberModal({
  isOpen,
  onClose,
}: AddMemberModalProps) {
    const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("developer");

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
        ventureId:
          "25ba5c5f-9898-4477-a38d-511c5b835cda",
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Member Created Successfully");

      setFullName("");
      setEmail("");
      setPassword("");
      setRole("developer");

      onClose();

      window.location.reload();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Add Team Member
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <input
  type="text"
  placeholder="Full Name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
/>

          <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
/>

          <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
/>

          <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
>
  <option value="developer">Developer</option>
  <option value="designer">Designer</option>
  <option value="manager">Manager</option>
</select>

          <button
  onClick={createMember}
  className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300"
>
  Create Member
</button>

        </div>

      </div>

    </div>
  );
}