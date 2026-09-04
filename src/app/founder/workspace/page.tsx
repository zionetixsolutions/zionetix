"use client";

import {
  useCallback,
  useState,
} from "react";

import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import WorkspaceSearchBar, {
  WorkspaceFilter,
  WorkspaceSort,
} from "@/components/workspace/WorkspaceSearchBar";
import WorkspaceGrid, {
  Workspace,
} from "@/components/workspace/WorkspaceGrid";
import WorkspaceActivity from "@/components/workspace/WorkspaceActivity";
import WorkspaceInsights from "@/components/workspace/WorkspaceInsights";

export default function WorkspacePage() {
  const [refreshKey, setRefreshKey] =
    useState(0);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<WorkspaceFilter>("all");

  const [sort, setSort] =
    useState<WorkspaceSort>("updated");

  const [workspaces, setWorkspaces] =
    useState<Workspace[]>([]);

  function handleWorkspaceCreated() {
    setRefreshKey(
      (prev) => prev + 1
    );
  }

  const handleWorkspacesLoaded =
    useCallback(
      (data: Workspace[]) => {
        setWorkspaces(data);
      },
      []
    );

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* HEADER */}

      <WorkspaceHeader />

      {/* SEARCH / FILTER / SORT */}

      <WorkspaceSearchBar
        search={search}
        filter={filter}
        sort={sort}
        onSearchChange={setSearch}
        onFilterChange={setFilter}
        onSortChange={setSort}
        onWorkspaceCreated={
          handleWorkspaceCreated
        }
      />

      {/* WORKSPACES */}

      <WorkspaceGrid
        key={refreshKey}
        refreshKey={refreshKey}
        search={search}
        filter={filter}
        sort={sort}
        onWorkspacesLoaded={
          handleWorkspacesLoaded
        }
      />

      {/* ACTIVITY + INSIGHTS */}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <WorkspaceActivity
            workspaces={workspaces}
          />
        </div>

        <div className="lg:col-span-4">
          <WorkspaceInsights
            workspaces={workspaces}
          />
        </div>
      </div>

      {/* FOOTER */}

      <footer
        className="
          mt-10
          flex
          flex-col
          justify-between
          gap-4
          border-t
          pt-6
          text-sm
          text-zinc-400
          md:flex-row
        "
      >
        <span>
          © 2026 Primordial. All rights reserved.
        </span>

        <div className="flex gap-8">
          <span>
            Privacy Policy
          </span>

          <span>
            Terms of Service
          </span>

          <span>
            Support
          </span>
        </div>
      </footer>
    </div>
  );
}