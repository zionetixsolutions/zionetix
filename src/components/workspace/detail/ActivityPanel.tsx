"use client";

import {
  FileUp,
  FileText,
  Trash2,
  Edit3,
  Plus,
  Clock,
} from "lucide-react";

interface WorkspaceActivity {
  id: string;
  workspace_id: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  performed_by: string | null;
  metadata: {
    fileName?: string;
    title?: string;
    [key: string]: unknown;
  } | null;
  created_at: string;
}

interface Props {
  activities: WorkspaceActivity[];
}

function getActivityIcon(actionType: string) {
  switch (actionType) {
    case "UPLOAD_FILE":
      return FileUp;
    case "DELETE_FILE":
    case "DELETE_NOTE":
      return Trash2;
    case "CREATE_NOTE":
      return Plus;
    case "UPDATE_NOTE":
      return Edit3;
    default:
      return FileText;
  }
}

function getActivityText(
  activity: WorkspaceActivity
) {
  const metadata = activity.metadata;

  switch (activity.action_type) {
    case "UPLOAD_FILE":
      return `uploaded ${
        metadata?.fileName || "a document"
      }`;

    case "DELETE_FILE":
      return `deleted ${
        metadata?.fileName || "a document"
      }`;

    case "CREATE_NOTE":
      return `created note "${
        metadata?.title || "Untitled"
      }"`;

    case "UPDATE_NOTE":
      return `updated note "${
        metadata?.title || "Untitled"
      }"`;

    case "DELETE_NOTE":
      return `deleted note "${
        metadata?.title || "Untitled"
      }"`;

    default:
      return activity.action_type
        .replaceAll("_", " ")
        .toLowerCase();
  }
}
function formatActivityTime(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(date);

  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: "UTC",
  }).format(date);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date);

  return `${month} ${day}, ${time}`;
}

export default function ActivityPanel({
  activities,
}: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <div>
          <h3 className="font-semibold text-lg">
            Recent Activity
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            Latest workspace activity
          </p>
        </div>

        <Clock
          size={18}
          className="text-zinc-400"
        />
      </div>

      {activities.length === 0 ? (
        <div className="p-8 text-center text-sm text-zinc-500">
          No activity found.
        </div>
      ) : (
        <div>
          {activities.map((activity) => {
            const Icon = getActivityIcon(
              activity.action_type
            );

            const actor =
              activity.performed_by ||
              "Unknown";

            return (
              <div
                key={activity.id}
                className="
                  flex
                  gap-4
                  px-6
                  py-4
                  border-b
                  last:border-b-0
                  hover:bg-zinc-50
                  transition
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-zinc-100
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Icon
                    size={17}
                    className="text-zinc-600"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-zinc-800">
                    <span className="font-medium">
                      {actor}
                    </span>{" "}
                    {getActivityText(
                      activity
                    )}
                  </p>

                  <p className="text-xs text-zinc-400 mt-1">
                    {formatActivityTime(
                      activity.created_at
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}