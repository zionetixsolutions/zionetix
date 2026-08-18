"use client";

import {
  Clock3,
  FolderKanban,
} from "lucide-react";

import type { Workspace } from "./WorkspaceGrid";

interface Props {
  workspaces: Workspace[];
}

function formatRelativeTime(
  date: string
) {
  const timestamp =
    new Date(date).getTime();

  if (Number.isNaN(timestamp)) {
    return "Unknown time";
  }

  const difference =
    Date.now() - timestamp;

  const minutes = Math.floor(
    difference / 60000
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1
        ? "minute"
        : "minutes"
    } ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours} ${
      hours === 1
        ? "hour"
        : "hours"
    } ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days < 30) {
    return `${days} ${
      days === 1
        ? "day"
        : "days"
    } ago`;
  }

  return new Date(
    date
  ).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

export default function WorkspaceActivity({
  workspaces,
}: Props) {
  const activities = workspaces
    .flatMap((workspace) => [
      {
        id: `${workspace.id}-updated`,
        workspace,
        type: "updated" as const,
        date: workspace.updated_at,
      },
      {
        id: `${workspace.id}-created`,
        workspace,
        type: "created" as const,
        date: workspace.created_at,
      },
    ])
    .sort(
      (a, b) =>
        new Date(
          b.date
        ).getTime() -
        new Date(
          a.date
        ).getTime()
    )
    .slice(0, 6);

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
          Recent Workspace Activity
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Latest changes across your workspaces
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl bg-zinc-50 p-8 text-center">
          <FolderKanban
            size={24}
            className="mx-auto text-zinc-400"
          />

          <p className="mt-3 font-medium text-zinc-700">
            No activity yet
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Workspace activity will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {activities.map(
            (activity) => (
              <div
                key={activity.id}
                className="flex gap-4"
              >
                <div
                  className="
                    mt-1
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-zinc-100
                  "
                >
                  <FolderKanban
                    size={16}
                    className="text-zinc-600"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900">
                    {activity.type ===
                    "created"
                      ? "Workspace created"
                      : "Workspace updated"}
                  </p>

                  <p className="mt-0.5 truncate text-sm text-zinc-500">
                    {activity.workspace.workspace_name}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
                    <Clock3 size={12} />

                    {formatRelativeTime(
                      activity.date
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}