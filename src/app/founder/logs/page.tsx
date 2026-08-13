"use client";

import { useState } from "react";

import { logs } from "@/data/logs";

import LogsHeader from "@/components/logs/LogsHeader";
import LogsStats from "@/components/logs/LogsStats";
import LogsToolbar from "@/components/logs/LogsToolbar";
import LogsFilters from "@/components/logs/LogsFilters";
import LogsTable from "@/components/logs/LogsTable";

export default function LogsPage() {
  const [search, setSearch] = useState("");

  const [severity, setSeverity] = useState("All");

  const [module, setModule] = useState("All Events");

  return (
    <div className="space-y-8">

      {/* Header */}

      <LogsHeader />

      {/* Statistics */}

      <LogsStats logs={logs} />

      {/* Search + Export */}

      <LogsToolbar
        search={search}
        severity={severity}
        onSearchChange={setSearch}
        onSeverityChange={setSeverity}
        onExport={() => {
          console.log("Export Logs");
        }}
      />

      {/* Module Chips */}

      <LogsFilters
        active={module}
        onChange={setModule}
      />

      {/* Logs Table */}

      <LogsTable
        logs={logs}
        search={search}
        severity={severity}
        module={module}
      />

    </div>
  );
}