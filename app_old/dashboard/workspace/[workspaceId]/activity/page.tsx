"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Activity {
  id: string;
  action_type: string;
  entity_type: string;
  performed_by: string;
  created_at: string;
}

export default function ActivityPage() {

  const params = useParams();

  const workspaceId =
    params.workspaceId as string;

  const [activities, setActivities] =
    useState<Activity[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

  if (!workspaceId)
    return;

  async function loadActivities() {

    try {
setLoading(true);
      const response =
        await fetch(
          `/api/workspace/activity?workspaceId=${workspaceId}`
        );

      const data =
        await response.json();

      if (data.success) {

        setActivities(
          data.activities
        );

      }

    } catch (error) {

      console.error(error);

    }
    finally {

  setLoading(false);

}

  }

  loadActivities();

}, [workspaceId]);

  if (loading) {

    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );

  }

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold text-white mb-8">
        Workspace Activity
      </h1>

      <div className="space-y-4">

        {activities.map(
          (activity) => (

            <div
              key={activity.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-white font-semibold">

                    {
                      activity.action_type
                    }

                  </h2>

                  <p className="text-zinc-400 text-sm mt-1">

                    {
                      activity.entity_type
                    }

                    {" • "}

                    {
                      activity.performed_by
                    }

                  </p>

                </div>

                <span className="text-zinc-500 text-sm">

                  {
                    new Date(
                      activity.created_at
                    ).toLocaleString()
                  }

                </span>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}