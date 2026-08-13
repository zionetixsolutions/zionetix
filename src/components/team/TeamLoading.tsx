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

const serifFont = "'Cormorant Garamond', serif";
const monoFont = "'JetBrains Mono', monospace";

function SkeletonMemberRow({ wide = true }: { wide?: boolean }) {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-100 shrink-0" />
          <div className="space-y-2">
            <div
              className={`h-4 bg-neutral-100 rounded ${
                wide ? "w-32" : "w-28"
              }`}
            />
            <div
              className={`h-3 bg-neutral-100/60 rounded ${
                wide ? "w-48" : "w-40"
              }`}
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-neutral-100 rounded-full" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 bg-neutral-100 rounded-full" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-neutral-100 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-neutral-100 rounded" />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="h-8 w-8 bg-neutral-100 rounded ml-auto" />
      </td>
    </tr>
  );
}

function SkeletonFillerRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4" colSpan={6}>
        <div className="h-12 w-full bg-neutral-50/50 rounded" />
      </td>
    </tr>
  );
}

export default function TeamPageLoading() {
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 opacity-40 pointer-events-none">
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-950 text-white rounded-xl text-sm font-semibold hover:shadow-sm transition-all">
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

        {/* Workspace Members Table — LOADING SKELETON */}
        <div className="w-full bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-4 text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Member
                  </th>
                  <th className="px-6 py-4 text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Role
                  </th>
                  <th className="px-6 py-4 text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                    Joined
                  </th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <SkeletonMemberRow wide />
                <SkeletonMemberRow />
                <SkeletonFillerRow />
                <SkeletonFillerRow />
                <SkeletonFillerRow />
                <SkeletonFillerRow />
                <SkeletonFillerRow />
                <SkeletonFillerRow />
                <SkeletonFillerRow />
                <SkeletonFillerRow />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
