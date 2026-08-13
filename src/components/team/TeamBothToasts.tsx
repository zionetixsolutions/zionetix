"use client";

import React, { useState } from "react";
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
  const [toastQueue, setToastQueue] = useState<("error" | "success")[]>([
    "error",
    "success",
  ]);

  const dismissCurrentToast = () => {
    setToastQueue((prev) => prev.slice(1));
  };

  const currentToast = toastQueue[0];

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
      {currentToast === "error" && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-start gap-4 bg-white p-4 rounded-lg shadow-md border border-red-200 w-[calc(100%-3rem)] max-w-md sm:w-full">
          <div className="flex-shrink-0">
            <span
              className="material-symbols-outlined text-red-700"
              style={{
                fontVariationSettings:
                  "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              error
            </span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-neutral-950 leading-tight">
              Invitation Failed
            </h4>
            <p className="text-sm text-neutral-600 mt-1">
              We couldnt send the invitation. Please try again.
            </p>
          </div>
          <button
            onClick={dismissCurrentToast}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {currentToast === "success" && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-start gap-4 bg-white p-4 rounded-lg shadow-md border border-neutral-200 w-[calc(100%-3rem)] max-w-md sm:w-full">
          <div className="flex-shrink-0">
            <span
              className="material-symbols-outlined text-green-700"
              style={{
                fontVariationSettings:
                  "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              check_circle
            </span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-neutral-950 leading-tight">
              Invitation Sent
            </h4>
            <p className="text-sm text-neutral-600 mt-1">
              The team invitation has been sent successfully.
            </p>
          </div>
          <button
            onClick={dismissCurrentToast}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
