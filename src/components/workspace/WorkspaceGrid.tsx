"use client";

import { useEffect, useState } from "react";
import WorkspaceCard from "./WorkspaceCard";

interface Workspace {
  id: string;
  venture_id: string;
  workspace_name: string;
  workspace_description: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export default function WorkspaceGrid() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const response = await fetch("/api/workspaces");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to fetch workspaces"
          );
        }

        setWorkspaces(result.data ?? []);
      } catch (error) {
        console.error("Workspace fetch error:", error);

        setError("Failed to load workspaces");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkspaces();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        <div className="h-[240px] rounded-3xl border border-zinc-200 bg-zinc-50 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-200 p-10 text-center text-zinc-500">
        No workspaces found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          workspace={{
            id: workspace.id,
            name: workspace.workspace_name,
            status: "Active",
            notes: 0,
            files: 0,
            updated: new Date(
              workspace.updated_at
            ).toLocaleDateString(),
          }}
        />
      ))}
    </div>
  );
}