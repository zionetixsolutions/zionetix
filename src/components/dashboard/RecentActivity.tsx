"use client";

import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

interface Activity {
  id: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  performed_by: string | null;
  metadata: {
    fileName?: string;
    title?: string;
  } | null;
  created_at: string;
}

function formatActivity(activity: Activity) {
  const metadata = activity.metadata;

  switch (activity.action_type) {
    case "UPLOAD_FILE":
      return metadata?.fileName
        ? `Uploaded ${metadata.fileName}`
        : "Uploaded a file";

    case "DELETE_FILE":
      return metadata?.fileName
        ? `Deleted ${metadata.fileName}`
        : "Deleted a file";

    case "CREATE_NOTE":
      return metadata?.title
        ? `Created note "${metadata.title}"`
        : "Created a note";

    case "UPDATE_NOTE":
      return metadata?.title
        ? `Updated note "${metadata.title}"`
        : "Updated a note";

    case "DELETE_NOTE":
      return metadata?.title
        ? `Deleted note "${metadata.title}"`
        : "Deleted a note";

    case "UPDATE_BRAIN_MAP":
      return "Brain Map Updated";

    default:
      return activity.action_type
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/^./, (char) => char.toUpperCase());
  }
}

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const diff = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (diff < 60) {
    return "Just now";
  }

  const minutes = Math.floor(diff / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleDateString();
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/dashboard/activity");

        const result = await response.json();

        if (result.success) {
          setActivities(result.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch recent activity:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <GlassCard>
      <div className="p-6">

        {/* Header */}

        <div className="flex justify-between items-center">
          <h2 className="font-semibold">
            Recent Activity
          </h2>

          <button className="text-sm text-zinc-500 hover:text-zinc-900 transition">
            View Timeline
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-6 space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex gap-4 animate-pulse"
              >
                <div className="w-4 h-4 rounded-full bg-zinc-200 mt-1" />

                <div className="space-y-2">
                  <div className="h-4 w-48 bg-zinc-200 rounded" />

                  <div className="h-3 w-24 bg-zinc-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activities */}

        {!loading && activities.length > 0 && (
          <div className="mt-6 space-y-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4"
              >
                {/* Timeline Dot */}

                <div
                  className="
                    w-4
                    h-4
                    rounded-full
                    bg-gradient-to-br
                    from-black
                    to-zinc-500
                    mt-1
                    shrink-0
                  "
                />

                {/* Activity Content */}

                <div className="min-w-0">
                  <p className="font-medium">
                    {formatActivity(activity)}
                  </p>

                  <p className="text-sm text-zinc-400">
                    {getTimeAgo(activity.created_at)}
                    {activity.performed_by
                      ? ` • ${activity.performed_by}`
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}

        {!loading && activities.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-400">
              No recent activity
            </p>
          </div>
        )}

      </div>
    </GlassCard>
  );
}