"use client";

import React, { useState } from "react";

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending Invite";
  lastActive: string;
  joinedDate: string;
  avatarUrl?: string;
};
const initialMembers: Member[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@startupalpha.io",
    role: "Founder",
    status: "Active",
    lastActive: "2 minutes ago",
    joinedDate: "12 Jan 2026",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrHGFmu74Bdg8_BWMs1ZCNMtAkvR05cZvLZU2_HwSNGcKk8PZcLIHNnjBPo30hSNKqkT7ccw_CFwlRsdT4Hu-469-Ydup1BJ0PYr5DUBJwy_U-cRbRTFjXcjYglaw-HN7g6t5Wt6yneZg7xIeeiImBghEUJscsZeIRH2zNqQVHqzWysf_A_gsBh4UUkvJp8PLRn1qleZsHUDZIeSBjmbkw8tQ0axvh86kKGzptDOCRIq-tq7qbTyOaVQ",
  },
  {
    id: "2",
    name: "Alex Rivera",
    email: "alex.r@startupalpha.io",
    role: "Administrator",
    status: "Active",
    lastActive: "15 minutes ago",
    joinedDate: "28 Feb 2026",
  },
  {
    id: "3",
    name: "Emily Carter",
    email: "emily.c@startupalpha.io",
    role: "Editor",
    status: "Pending Invite",
    lastActive: "—",
    joinedDate: "18 Jul 2026",
  },
];
const statCards = [
  { label: "Total Members", value: "12", icon: "group", index: "01" },
  { label: "Active Members", value: "10", icon: "person_check", index: "02" },
  { label: "Pending Invitations", value: "02", icon: "mail", index: "03" },
  {
    label: "Administrators",
    value: "03",
    icon: "admin_panel_settings",
    index: "04",
  },
];

const serifFont = "'Cormorant Garamond', serif";
const monoFont = "'JetBrains Mono', monospace";

const removalConsequences = [
  "Revoke workspace access",
  "End active sessions",
  "Remove assigned permissions",
  "Preserve activity logs for auditing",
];

export default function TeamInviteMembers() {
  const [members, setMembers] = useState<Member[]>(initialMembers);

const [searchTerm, setSearchTerm] = useState("");

const [selectedRole, setSelectedRole] = useState("All");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);

  const handleConfirmRemove = () => {
    // wire your actual remove-member API call here
    setMemberToRemove(null);
  };
const filteredMembers = members.filter((member) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    member.name.toLowerCase().includes(search) ||
    member.email.toLowerCase().includes(search);

  const matchesRole =
    selectedRole === "All" || member.role === selectedRole;

  return matchesSearch && matchesRole;
});
  return (
    
    <div className="w-full">
      <div className="p-12 space-y-12 mx-auto w-full max-w-7xl">
        {/* Hero */}
        <section className="mb-12">
          <h2
            className="text-4xl sm:text-5xl leading-tight text-neutral-950 mb-2"
            style={{ fontFamily: serifFont }}
          >
            Team
          </h2>
          <div className="flex items-center gap-3 text-neutral-600 italic">
            <span className="text-base">
              Manage workspace members, roles, permissions and invitations.
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-950 text-white rounded-xl text-sm font-semibold hover:shadow-sm transition-all"
            >
              <span className="material-symbols-outlined">person_add</span>
              Invite Member
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 border border-neutral-200 text-neutral-950 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-all">
              <span className="material-symbols-outlined">download</span>
              Export Members
            </button>
          </div>
        </section>

        {/* Row 1: Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statCards.map((card) => (
            <div
              key={card.index}
              className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200 group hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-neutral-600 group-hover:scale-110 transition-transform">
                  {card.icon}
                </span>
                <span
                  className="text-sm text-neutral-500"
                  style={{ fontFamily: monoFont }}
                >
                  {card.index}
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-bold mb-2 uppercase">
                {card.label}
              </p>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Workspace Members Table */}
        <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold">Workspace Members</h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
              <div className="relative flex items-center flex-1 md:w-64">
                <span className="material-symbols-outlined absolute left-3 text-neutral-500/60 text-sm">
                  search
                </span>
                <input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full pl-9 pr-4 py-2 bg-neutral-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-neutral-950/20 placeholder:text-neutral-400 outline-none"
  placeholder="Search members..."
  type="text"
/>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-all shrink-0">
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>
                Filter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-10 py-4 text-[10px] text-neutral-600 uppercase tracking-widest font-bold whitespace-nowrap">
                    Member
                  </th>
                  <th className="px-6 py-4 text-[10px] text-neutral-600 uppercase tracking-widest font-bold whitespace-nowrap">
                    Role
                  </th>
                  <th className="px-6 py-4 text-[10px] text-neutral-600 uppercase tracking-widest font-bold whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] text-neutral-600 uppercase tracking-widest font-bold whitespace-nowrap">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-[10px] text-neutral-600 uppercase tracking-widest font-bold whitespace-nowrap">
                    Joined Date
                  </th>
                  <th className="px-10 py-4 text-right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-neutral-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        {member.avatarUrl ? (
                          <div className="w-10 h-10 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                            <img
                              alt={member.name}
                              className="w-full h-full object-cover"
                              src={member.avatarUrl}
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200 shrink-0">
                            <span className="material-symbols-outlined text-neutral-600">
                              person
                            </span>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {member.name}
                          </p>
                          <p
                            className="text-[10px] text-neutral-500 truncate"
                            style={{ fontFamily: monoFont }}
                          >
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm text-neutral-600 whitespace-nowrap">
                      {member.role}
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          member.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-sm text-neutral-600 whitespace-nowrap">
                      {member.lastActive}
                    </td>
                    <td className="px-6 py-6 text-sm text-neutral-600 whitespace-nowrap">
                      {member.joinedDate}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button
                        onClick={() => setMemberToRemove(member)}
                        className="material-symbols-outlined text-neutral-600 hover:text-neutral-950 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        more_vert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Invite Team Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-neutral-950/20 backdrop-blur-md"
            onClick={() => setIsInviteModalOpen(false)}
          />
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-8 pt-8 pb-6">
              <h3 className="text-lg font-semibold mb-1">
                Invite Team Member
              </h3>
              <p className="text-sm text-neutral-600">
                Invite a new member to join your workspace.
              </p>
            </div>
            <form
              className="px-8 pb-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // wire your actual invite API call here
                setIsInviteModalOpen(false);
              }}
            >
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all"
                    placeholder="e.g. Michael Chen"
                    type="text"
                  />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all"
                    placeholder="michael@startupalpha.io"
                    type="email"
                  />
                </div>
                {/* Role & Department */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                      Role
                    </label>
                    <select className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all appearance-none">
                      <option>Administrator</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                      Department
                    </label>
                    <input
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all"
                      placeholder="Optional"
                      type="text"
                    />
                  </div>
                </div>
                {/* Personal Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Personal Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all min-h-[100px]"
                    placeholder="Welcome to our workspace! Looking forward to collaborating with you."
                  />
                </div>
                {/* Settings */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      defaultChecked
                      className="w-5 h-5 rounded border-neutral-200 text-neutral-950 focus:ring-neutral-950/20"
                      type="checkbox"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-950 transition-colors">
                      Send invitation email immediately
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-5 h-5 rounded border-neutral-200 text-neutral-950 focus:ring-neutral-950/20"
                      type="checkbox"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-950 transition-colors">
                      Notify me when the invitation is accepted
                    </span>
                  </label>
                </div>
              </div>
              {/* Footer Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  className="flex-1 px-6 py-2.5 border border-neutral-200 text-neutral-950 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-all"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-2.5 bg-neutral-950 text-white rounded-xl text-sm font-semibold hover:shadow-sm transition-all"
                  type="submit"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Team Member confirmation modal (centered) */}
      {memberToRemove && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/20 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-2xl border border-neutral-200 shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-red-700">
                    person_remove
                  </span>
                </div>
                <h3 className="text-lg font-semibold">
                  Remove Team Member
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mb-8">
                Are you sure you want to remove this team member from the
                workspace? This action will immediately revoke their access
                to the workspace. This action can be reversed later by
                sending a new invitation.
              </p>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/50 mb-8">
                <div className="flex items-center gap-4">
                  {memberToRemove.avatarUrl ? (
                    <div className="w-10 h-10 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                      <img
                        alt={memberToRemove.name}
                        className="w-full h-full object-cover"
                        src={memberToRemove.avatarUrl}
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200 shrink-0">
                      <span className="material-symbols-outlined text-neutral-600">
                        person
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold">
                      {memberToRemove.name}
                    </p>
                    <p
                      className="text-[10px] text-neutral-500"
                      style={{ fontFamily: monoFont }}
                    >
                      {memberToRemove.email}
                    </p>
                    <p className="text-[10px] text-neutral-600 mt-0.5">
                      {memberToRemove.role}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50/60 p-4 rounded-xl border border-red-200/60">
                <p className="text-[10px] text-red-700 font-bold uppercase mb-2">
                  Removing this member will:
                </p>
                <ul className="space-y-1.5">
                  {removalConsequences.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-neutral-600"
                    >
                      <span className="w-1 h-1 bg-red-700 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-8 py-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-4">
              <button
                onClick={() => setMemberToRemove(null)}
                className="px-6 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="px-6 py-2.5 bg-red-700 text-white rounded-xl text-sm font-semibold hover:shadow-sm transition-all"
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
