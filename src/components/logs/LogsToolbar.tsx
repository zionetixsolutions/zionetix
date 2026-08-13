"use client";

import { Search, Download } from "lucide-react";

interface LogsToolbarProps {
  search: string;
  severity: string;
  onSearchChange: (value: string) => void;
  onSeverityChange: (value: string) => void;
  onExport?: () => void;
}

export default function LogsToolbar({
  search,
  severity,
  onSearchChange,
  onSeverityChange,
  onExport,
}: LogsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by user, module, action or log ID..."
          className="
            w-full
            rounded-xl
            border
            border-zinc-200
            bg-zinc-50
            py-3
            pl-11
            pr-4
            text-sm
            outline-none
            transition
            focus:border-black
            focus:bg-white
          "
        />
      </div>

      {/* Right Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={severity}
          onChange={(e) => onSeverityChange(e.target.value)}
          className="
            rounded-xl
            border
            border-zinc-200
            bg-white
            px-4
            py-3
            text-sm
            outline-none
            focus:border-black
          "
        >
          <option value="All">Severity: All</option>
          <option value="Info">Info</option>
          <option value="Warning">Warning</option>
          <option value="Critical">Critical</option>
        </select>

        <button
          onClick={onExport}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-black
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-zinc-800
          "
        >
          <Download size={17} />
          Export Logs
        </button>
      </div>
    </div>
  );
}