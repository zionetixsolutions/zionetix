"use client";

import type { Workspace } from "./WorkspaceGrid";

interface Props {
  workspaces: Workspace[];
}

export default function WorkspaceInsights({
  workspaces,
}: Props) {
  const total =
    workspaces.length;

  /*
   * Until status is available from API,
   * all currently fetched workspaces are
   * treated as active.
   */
  const active = total;

  const archived = 0;

  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-200
        bg-white
        p-8
      "
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold">
          Workspace Insights
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Overview of your workspaces
        </p>
      </div>

      <div className="space-y-4">
        <InsightRow
          label="Total Workspaces"
          value={total}
        />

        <InsightRow
          label="Active"
          value={active}
          valueClassName="text-green-600"
        />

        <InsightRow
          label="Archived"
          value={archived}
          valueClassName="text-zinc-500"
        />
      </div>
    </div>
  );
}

function InsightRow({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: number;
  valueClassName?: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-zinc-200
        p-5
      "
    >
      <span className="text-sm text-zinc-600">
        {label}
      </span>

      <span
        className={`
          text-lg
          font-semibold
          ${valueClassName}
        `}
      >
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}