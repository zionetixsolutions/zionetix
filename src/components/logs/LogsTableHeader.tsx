"use client";

import { ArrowUpDown } from "lucide-react";

export default function LogsTableHeader() {
  return (
    <thead className="sticky top-0 z-10 bg-zinc-50">
      <tr className="border-b border-zinc-200">
        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Event
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
          User
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Module
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Severity
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Status
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Date
        </th>

        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
          <div className="flex items-center justify-end gap-2">
            Latest
            <ArrowUpDown size={14} />
          </div>
        </th>
      </tr>
    </thead>
  );
}