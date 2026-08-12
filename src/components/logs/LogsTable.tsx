"use client";

import { useMemo, useState } from "react";

import type { Log } from "@/types/log";

import LogsTableHeader from "./LogsTableHeader";
import LogsTableRow from "./LogsTableRow";
import Pagination from "./Pagination";
import LogDrawer from "./LogDrawer";

interface LogsTableProps {
  logs: Log[];
  search: string;
  severity: string;
  module: string;
}

export default function LogsTable({
  logs,
  search,
  severity,
  module,
}: LogsTableProps) {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        query === "" ||
        log.user.name.toLowerCase().includes(query) ||
        log.user.email.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.module.toLowerCase().includes(query) ||
        log.id.toLowerCase().includes(query);

      const matchesSeverity =
        severity === "All" ||
        log.severity === severity;

      const matchesModule =
        module === "All Events" ||
        module === "All" ||
        log.module === module;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesModule
      );
    });
  }, [logs, search, severity, module]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">

  {/* Card Header */}

  <div className="border-b bg-zinc-50 px-6 py-4">

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <h3 className="text-sm font-bold uppercase tracking-widest">
          Audit Trail
        </h3>

        <span className="rounded bg-zinc-200 px-2 py-1 text-[10px] font-bold uppercase">
          Live Updating
        </span>

      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          System Healthy
        </div>

        <div className="text-sm text-zinc-500">
          Latest First
        </div>

      </div>

    </div>

  </div>

  {/* Scroll */}

  <div className="max-h-[700px] overflow-auto">

    <table className="min-w-full table-fixed">

      <LogsTableHeader />

      <tbody>

        {filteredLogs.length === 0 ? (

          <tr>

            <td
              colSpan={7}
              className="py-16 text-center text-sm text-zinc-500"
            >
              No logs found.
            </td>

          </tr>

        ) : (

          filteredLogs.map((log) => (

            <LogsTableRow
              key={log.id}
              log={log}
              onClick={() => setSelectedLog(log)}
            />

          ))

        )}

      </tbody>

    </table>

  </div>

  <Pagination
    total={filteredLogs.length}
    currentPage={1}
    totalPages={1}
  />

</div>

      <LogDrawer
        log={selectedLog}
        open={selectedLog !== null}
        onClose={() => setSelectedLog(null)}
      />
    </>
  );
}