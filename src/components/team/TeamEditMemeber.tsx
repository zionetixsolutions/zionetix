"use client";

import React, { useState } from "react";
type Member = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department?: string;
  status: "Active" | "Pending Invite";
  lastActive: string;
  joinedDate: string;
  avatarUrl?: string;
  permissions?: string[];
  recentActivity?: string[];
};

const members: Member[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@startupalpha.io",
    phone: "+1 (555) 012-3456",
    role: "Founder",
    department: "Executive",
    status: "Active",
    lastActive: "2 minutes ago",
    joinedDate: "12 Jan 2026",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrHGFmu74Bdg8_BWMs1ZCNMtAkvR05cZvLZU2_HwSNGcKk8PZcLIHNnjBPo30hSNKqkT7ccw_CFwlRsdT4Hu-469-Ydup1BJ0PYr5DUBJwy_U-cRbRTFjXcjYglaw-HN7g6t5Wt6yneZg7xIeeiImBghEUJscsZeIRH2zNqQVHqzWysf_A_gsBh4UUkvJp8PLRn1qleZsHUDZIeSBjmbkw8tQ0axvh86kKGzptDOCRIq-tq7qbTyOaVQ",
    permissions: [
      "Workspace Access",
      "Documents",
      "Brain Map",
      "Decision Inbox",
      "Logs",
      "AI Advisors",
    ],
    recentActivity: [
      "Edited Business Plan",
      "Approved Decision",
      "Invited Team Member",
      "Updated Workspace Settings",
      "Exported Logs",
    ],
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

export default function TeamPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

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
                  className="w-full pl-9 pr-4 py-2 bg-neutral-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-neutral-950/20 placeholder:text-neutral-400 outline-none"
                  placeholder="Filter members..."
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
                {members.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
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
                      <button className="material-symbols-outlined text-neutral-600 hover:text-neutral-950 opacity-0 group-hover:opacity-100 transition-all">
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

      {/* Invite Team Member Modal placeholder */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/15 p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 w-full max-w-md">
            <p className="text-sm text-neutral-600">
              Invite Member modal content goes here.
            </p>
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="mt-6 px-6 py-2.5 bg-neutral-950 text-white rounded-xl text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Member Details drawer */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedMember(null)}
          />
          <aside className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-8 border-b border-neutral-200 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-neutral-950">
                  Member Details
                </h2>
                <p className="text-sm text-neutral-600">
                  View and manage workspace member profile and permissions.
                </p>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-neutral-50 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
              {/* Profile */}
              <section className="space-y-4">
                <h3 className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
                  Profile
                </h3>
                <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200/50">
                  {selectedMember.avatarUrl ? (
                    <div className="w-16 h-16 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                      <img
                        alt={selectedMember.name}
                        className="w-full h-full object-cover"
                        src={selectedMember.avatarUrl}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 shrink-0">
                      <span className="material-symbols-outlined text-neutral-600">
                        person
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold">{selectedMember.name}</p>
                    <p className="text-[10px] text-neutral-600">
                      {selectedMember.email}
                    </p>
                    {selectedMember.phone && (
                      <p
                        className="text-[11px] text-neutral-500 mt-1"
                        style={{ fontFamily: monoFont }}
                      >
                        {selectedMember.phone}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Workspace Information */}
              <section className="space-y-4">
                <h3 className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
                  Workspace Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest mb-1">
                      Role
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedMember.role}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest mb-1">
                      Status
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        selectedMember.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {selectedMember.status}
                    </span>
                  </div>
                  {selectedMember.department && (
                    <div>
                      <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest mb-1">
                        Department
                      </p>
                      <p className="text-sm font-semibold">
                        {selectedMember.department}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest mb-1">
                      Joined Date
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedMember.joinedDate}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest mb-1">
                      Last Active
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedMember.lastActive}
                    </p>
                  </div>
                </div>
              </section>

              {/* Permissions */}
              {selectedMember.permissions && (
                <section className="space-y-4">
                  <h3 className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
                    Permissions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-[10px] font-bold"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Recent Activity */}
              {selectedMember.recentActivity && (
                <section className="space-y-4">
                  <h3 className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {selectedMember.recentActivity.map((activity) => (
                      <div key={activity} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-neutral-950 rounded-full shrink-0" />
                        <p className="text-sm text-neutral-950">{activity}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="p-8 border-t border-neutral-200 bg-neutral-50/30 flex gap-3">
              <button
                onClick={() => setSelectedMember(null)}
                className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
              >
                Close
              </button>
              <button
                onClick={() => setEditingMember(selectedMember)}
                className="flex-1 px-4 py-3 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all"
              >
                Edit Member
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Edit Member modal */}
      {editingMember && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-neutral-950/20 backdrop-blur-md"
            onClick={() => setEditingMember(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-8 pt-8 pb-6">
              <h3 className="text-lg font-semibold mb-1">Edit Member</h3>
              <p className="text-sm text-neutral-600">
                Update member information, role and account status.
              </p>
            </div>
            <form
              className="px-8 pb-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // wire your actual update-member API call here
                setEditingMember(null);
              }}
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all"
                    type="text"
                    defaultValue={editingMember.name}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all"
                    type="email"
                    defaultValue={editingMember.email}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                      Role
                    </label>
                    <select
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all appearance-none"
                      defaultValue={editingMember.role}
                    >
                      <option>Founder</option>
                      <option>Administrator</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                      Status
                    </label>
                    <select
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all appearance-none"
                      defaultValue={
                        editingMember.status === "Active"
                          ? "Active"
                          : "Pending"
                      }
                    >
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Department
                  </label>
                  <input
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-1 focus:ring-neutral-950/20 outline-none transition-all"
                    type="text"
                    defaultValue={editingMember.department ?? ""}
                  />
                </div>
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      defaultChecked
                      className="w-5 h-5 rounded border-neutral-200 text-neutral-950 focus:ring-neutral-950/20"
                      type="checkbox"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-950 transition-colors">
                      Active Member
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      defaultChecked
                      className="w-5 h-5 rounded border-neutral-200 text-neutral-950 focus:ring-neutral-950/20"
                      type="checkbox"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-950 transition-colors">
                      Allow Workspace Access
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setEditingMember(null)}
                  className="flex-1 px-6 py-2.5 border border-neutral-200 text-neutral-950 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-all"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-2.5 bg-neutral-950 text-white rounded-xl text-sm font-semibold hover:shadow-sm transition-all"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
