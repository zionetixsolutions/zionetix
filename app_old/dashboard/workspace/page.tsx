"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Workspace {
  id: string;
  workspace_name: string;
}

export default function WorkspacesPage() {

  const router = useRouter();

  const [workspaces, setWorkspaces] =
    useState<Workspace[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadWorkspaces() {

      try {

        const response =
          await fetch(
            "/api/workspace"
          );

        const data =
          await response.json();

        console.log(data);

        if (data.success) {

          setWorkspaces(
            data.workspaces
          );

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    const timer =
      setTimeout(
        loadWorkspaces,
        0
      );

    return () =>
      clearTimeout(timer);

  }, []);

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
        Workspaces
      </h1>

      <div className="grid grid-cols-3 gap-5">

        {workspaces.map(
          (workspace) => (

            <div
              key={workspace.id}
              onClick={() =>
                router.push(
                  `/dashboard/workspace/${workspace.id}`
                )
              }
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 cursor-pointer"
            >

              <h2 className="text-white text-xl">
                {
                  workspace.workspace_name
                }
              </h2>

            </div>

          )
        )}

      </div>

    </div>
  );
}