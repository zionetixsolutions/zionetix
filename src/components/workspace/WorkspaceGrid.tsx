"use client";

import {
  useEffect,
  useState,
} from "react";

import WorkspaceCard from "./WorkspaceCard";

import type {
  WorkspaceFilter,
  WorkspaceSort,
} from "./WorkspaceSearchBar";

export interface Workspace {
  id: string;
  venture_id: string;
  workspace_name: string;
  workspace_description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

interface Props {
  search: string;
  filter: WorkspaceFilter;
  sort: WorkspaceSort;
  refreshKey?: number;
  onWorkspacesLoaded?: (
    workspaces: Workspace[]
  ) => void;
}

export default function WorkspaceGrid({
  search,
  filter,
  sort,
  refreshKey = 0,
  onWorkspacesLoaded,
}: Props) {
  const [workspaces, setWorkspaces] =
    useState<Workspace[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function fetchWorkspaces() {
      setLoading(true);
      setError("");

      try {
        const response =
          await fetch(
            "/api/workspaces",
            {
              cache: "no-store",
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Failed to fetch workspaces"
          );
        }

        const data =
          Array.isArray(result.data)
            ? result.data
            : [];

        setWorkspaces(data);

        onWorkspacesLoaded?.(data);
      } catch (error) {
        console.error(
          "Workspace fetch error:",
          error
        );

        setError(
          "Failed to load workspaces"
        );

        onWorkspacesLoaded?.([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkspaces();
  }, [
    refreshKey,
    onWorkspacesLoaded,
  ]);

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredWorkspaces =
    workspaces.filter(
      (workspace) => {
        const query =
          search
            .trim()
            .toLowerCase();

        const matchesSearch =
          !query ||
          workspace.workspace_name
            .toLowerCase()
            .includes(query) ||
          (
            workspace.workspace_description ||
            ""
          )
            .toLowerCase()
            .includes(query);

        /*
         * Currently your workspace API
         * does not contain a status field.
         *
         * So "active" means normal workspace,
         * while archived can be added later
         * when status exists in DB.
         */
        const status =
          "active";

        const matchesFilter =
          filter === "all" ||
          filter === status;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );

  /* =====================================================
     SORT
  ===================================================== */

  const sortedWorkspaces =
    [...filteredWorkspaces].sort(
      (a, b) => {
        switch (sort) {
          case "created":
            return (
              new Date(
                b.created_at
              ).getTime() -
              new Date(
                a.created_at
              ).getTime()
            );

          case "name-asc":
            return a.workspace_name.localeCompare(
              b.workspace_name
            );

          case "name-desc":
            return b.workspace_name.localeCompare(
              a.workspace_name
            );

          case "updated":
          default:
            return (
              new Date(
                b.updated_at
              ).getTime() -
              new Date(
                a.updated_at
              ).getTime()
            );
        }
      }
    );

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-[240px]
              rounded-3xl
              border
              border-zinc-200
              bg-zinc-50
              animate-pulse
            "
          />
        ))}
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-6
          text-red-600
        "
      >
        {error}
      </div>
    );
  }

  /* =====================================================
     EMPTY FILTER RESULT
  ===================================================== */

  if (
    sortedWorkspaces.length === 0
  ) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-zinc-200
          bg-white
          p-10
          text-center
        "
      >
        <p className="font-medium text-zinc-800">
          No workspaces found
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Try changing your search or
          filter.
        </p>
      </div>
    );
  }

  /* =====================================================
     GRID
  ===================================================== */

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {sortedWorkspaces.map(
        (workspace) => (
          <WorkspaceCard
            key={workspace.id}
            workspace={{
              id: workspace.id,

              name:
                workspace.workspace_name,

              status: "Active",

              notes: 0,

              files: 0,

              updated:
                new Date(
                  workspace.updated_at
                ).toLocaleDateString(),
            }}
          />
        )
      )}
    </div>
  );
}