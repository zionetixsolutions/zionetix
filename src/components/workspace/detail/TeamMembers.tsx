"use client";

import { UserPlus, ChevronRight } from "lucide-react";

const members = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Manager",
    badge: "OWNER",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "UI/UX Designer",
    badge: "EDITOR",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Frontend Developer",
    badge: "EDITOR",
    image: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "QA Engineer",
    badge: "VIEWER",
    image: "https://i.pravatar.cc/100?img=9",
  },
];

export default function TeamMembers() {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <h3 className="font-semibold text-lg">
          Team Members
        </h3>

        <button className="flex items-center gap-2 text-sm font-medium">
          <UserPlus size={16} />
          Invite Member
        </button>
      </div>

      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between px-6 py-4 border-b"
        >
          <div className="flex items-center gap-3">
            <img
              src={member.image}
              alt={member.name}
              className="w-11 h-11 rounded-full"
            />

            <div>
              <p className="font-medium">
                {member.name}
              </p>

              <p className="text-sm text-zinc-500">
                {member.role}
              </p>
            </div>
          </div>

          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              member.badge === "OWNER"
                ? "bg-green-100 text-green-700"
                : member.badge === "EDITOR"
                ? "bg-zinc-100 text-zinc-700"
                : "bg-zinc-100 text-zinc-500"
            }`}
          >
            {member.badge}
          </span>
        </div>
      ))}

      <div className="px-6 py-4">
        <button className="flex items-center gap-2 text-sm font-medium">
          View all members
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}