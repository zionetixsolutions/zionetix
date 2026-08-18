"use client";

import { useState } from "react";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Plus,
  X,
} from "lucide-react";

import CreateWorkspaceModal from "@/components/workspace/modal/CreateWorkspaceModal";

export type WorkspaceFilter =
  | "all"
  | "active"
  | "archived";

export type WorkspaceSort =
  | "updated"
  | "created"
  | "name-asc"
  | "name-desc";

interface Props {
  search: string;
  filter: WorkspaceFilter;
  sort: WorkspaceSort;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: WorkspaceFilter) => void;
  onSortChange: (value: WorkspaceSort) => void;
  onWorkspaceCreated?: () => void;
}

export default function WorkspaceSearchBar({
  search,
  filter,
  sort,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onWorkspaceCreated,
}: Props) {
  const [openModal, setOpenModal] =
    useState(false);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [sortOpen, setSortOpen] =
    useState(false);

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        {/* SEARCH */}

        <div className="relative flex-1">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-400
            "
          />

          <input
            value={search}
            onChange={(e) =>
              onSearchChange(
                e.target.value
              )
            }
            placeholder="Search workspaces..."
            className="
              h-12
              w-full
              rounded-xl
              border
              border-zinc-200
              bg-white
              pl-12
              pr-10
              text-sm
              outline-none
              transition
              focus:border-black
            "
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                onSearchChange("")
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-lg
                p-1
                text-zinc-400
                hover:bg-zinc-100
                hover:text-black
              "
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* FILTER */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setFilterOpen(
                (prev) => !prev
              );
              setSortOpen(false);
            }}
            className={`
              h-12
              px-6
              rounded-xl
              border
              flex
              items-center
              gap-2
              text-sm
              transition
              ${
                filter !== "all"
                  ? "border-black bg-zinc-50"
                  : "border-zinc-200 bg-white"
              }
            `}
          >
            <SlidersHorizontal
              size={16}
            />

            Filter

            {filter !== "all" && (
              <span className="h-2 w-2 rounded-full bg-black" />
            )}
          </button>

          {filterOpen && (
            <div
              className="
                absolute
                right-0
                top-14
                z-30
                w-48
                rounded-2xl
                border
                border-zinc-200
                bg-white
                p-2
                shadow-xl
              "
            >
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Status
              </p>

              {[
                ["all", "All Workspaces"],
                ["active", "Active"],
                ["archived", "Archived"],
              ].map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      onFilterChange(
                        value as WorkspaceFilter
                      );
                      setFilterOpen(
                        false
                      );
                    }}
                    className={`
                      w-full
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      transition
                      ${
                        filter === value
                          ? "bg-zinc-100 font-medium"
                          : "hover:bg-zinc-50"
                      }
                    `}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* SORT */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setSortOpen(
                (prev) => !prev
              );
              setFilterOpen(false);
            }}
            className="
              h-12
              px-6
              rounded-xl
              border
              border-zinc-200
              bg-white
              flex
              items-center
              gap-2
              text-sm
              transition
              hover:bg-zinc-50
            "
          >
            <ArrowUpDown size={16} />

            Sort
          </button>

          {sortOpen && (
            <div
              className="
                absolute
                right-0
                top-14
                z-30
                w-52
                rounded-2xl
                border
                border-zinc-200
                bg-white
                p-2
                shadow-xl
              "
            >
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Sort by
              </p>

              {[
                [
                  "updated",
                  "Recently Updated",
                ],
                [
                  "created",
                  "Recently Created",
                ],
                [
                  "name-asc",
                  "Name A → Z",
                ],
                [
                  "name-desc",
                  "Name Z → A",
                ],
              ].map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      onSortChange(
                        value as WorkspaceSort
                      );
                      setSortOpen(
                        false
                      );
                    }}
                    className={`
                      w-full
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      transition
                      ${
                        sort === value
                          ? "bg-zinc-100 font-medium"
                          : "hover:bg-zinc-50"
                      }
                    `}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* CREATE */}

        <button
          type="button"
          onClick={() =>
            setOpenModal(true)
          }
          className="
            h-12
            px-6
            rounded-xl
            bg-black
            text-white
            flex
            items-center
            gap-2
            text-sm
            font-medium
            transition
            hover:bg-zinc-800
          "
        >
          <Plus size={16} />

          Create Workspace
        </button>
      </div>

      <CreateWorkspaceModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onCreated={() => {
          setOpenModal(false);
          onWorkspaceCreated?.();
        }}
      />
    </>
  );
}