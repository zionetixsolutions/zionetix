"use client";

import type { Log } from "@/types/log";

import LogSeverityBadge from "./LogSeverityBadge";
import LogStatusBadge from "./LogStatusBadge";

interface LogsTableRowProps {
  log: Log;
  onClick: () => void;
}

export default function LogsTableRow({
  log,
  onClick,
}: LogsTableRowProps) {
  return (
    <tr
      onClick={onClick}
      className="group cursor-pointer border-b border-zinc-200 transition-colors hover:bg-zinc-50"
    >
      {/* Timestamp */}

      <td className="px-6 py-4 align-top">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-zinc-900">
            {log.date}
          </p>

          <p className="text-[11px] text-zinc-500">
            {log.time}
          </p>
        </div>
      </td>

      {/* User */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {log.user.avatar ? (
            <img
              src={log.user.avatar}
              alt={log.user.name}
              className="h-9 w-9 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
              {log.user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {log.user.name}
            </p>

            <p className="truncate text-xs text-zinc-500">
              {log.user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Module */}

      <td className="px-6 py-4">
        <span className="rounded-md border border-zinc-200 bg-zinc-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-700">
          {log.module}
        </span>
      </td>

      {/* Action */}

      <td className="px-6 py-4">
        <p className="truncate text-sm font-medium text-zinc-900">
          {log.action}
        </p>
      </td>

      {/* Severity */}

      <td className="px-6 py-4">
        <LogSeverityBadge severity={log.severity} />
      </td>

      {/* Status */}

      <td className="px-6 py-4">
        <LogStatusBadge status={log.status} />
      </td>

      {/* Details */}

      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-xs font-bold uppercase tracking-wider text-black hover:underline"
        >
          Details
        </button>
      </td>
    </tr>
  );
}