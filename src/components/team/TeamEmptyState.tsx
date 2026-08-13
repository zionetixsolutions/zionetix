"use client";

import React from "react";

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

interface TeamEmptyStateProps {
  onInvite: () => void;
}

export default function TeamEmptyState({
  onInvite,
}: TeamEmptyStateProps) {


  return (
    <div className="p-margin-page space-y-12 mx-auto w-full max-w-7xl">
      {/* Hero */}
      <section className="mb-12">
        <h2 className="font-serif text-[48px] leading-tight text-primary mb-2">
          Team
        </h2>
        <div className="flex items-center gap-3 text-secondary italic">
          <span className="text-body-lg">
            Manage workspace members, roles, permissions and invitations.
          </span>
        </div>
        <div className="flex items-center gap-4 mt-8 opacity-40 pointer-events-none">
          <button onClick={onInvite} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-body-md font-semibold hover:shadow-sm transition-all">
            <span className="material-symbols-outlined">person_add</span>
            Invite Member
          </button>
          <button onClick={onInvite} className="flex items-center gap-2 px-6 py-2.5 border border-outline text-primary rounded-xl text-body-md font-semibold hover:bg-surface-off-white transition-all">
            <span className="material-symbols-outlined">download</span>
            Export Members
          </button>
        </div>
      </section>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {statCards.map((card) => (
          <div
            key={card.index}
            className="bg-surface-off-white p-8 rounded-2xl border border-outline group hover:shadow-sm transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">
                {card.icon}
              </span>
              <span className="text-mono-label text-ai-grey">{card.index}</span>
            </div>
            <p className="text-label-caps text-secondary font-bold mb-2 uppercase text-xs">
              {card.label}
            </p>
            <p className="text-headline-lg font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div className="w-full bg-white rounded-2xl border border-outline p-12 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-surface-off-white rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-secondary/40 text-[40px]">
            group_add
          </span>
        </div>
        <h3 className="text-headline-md font-bold text-primary mb-2">
          No team members yet
        </h3>
        <p className="text-body-md text-secondary max-w-md mb-8">
          Your workspace currently has no team members. Invite colleagues to
          collaborate, manage documents, review decisions and work together
          inside the Founder Dashboard.
        </p>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-body-md font-semibold hover:shadow-sm transition-all">
            <span className="material-symbols-outlined">person_add</span>
            Invite Member
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 border border-outline text-primary rounded-xl text-body-md font-semibold hover:bg-surface-off-white transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
