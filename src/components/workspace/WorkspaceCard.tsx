"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Trash2,
} from "lucide-react";

import { Workspace } from "@/data/workspaceData";

import DeleteWorkspaceModal from "@/components/workspace/modal/DeleteWorkspaceModal";

interface Props {
  workspace: Workspace;
}

export default function WorkspaceCard({
  workspace,
}: Props) {
  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  async function handleDeleteWorkspace() {
    setDeleteError("");
    setDeleting(true);

    try {
      const response = await fetch(
        `/api/workspaces/${workspace.id}`,
        {
          method: "DELETE",
        }
      );

      let result: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to delete workspace"
        );
      }

      /*
       * Close modal first.
       */
      setDeleteOpen(false);

      /*
       * Refresh workspace list.
       * This removes the deleted workspace
       * from WorkspaceGrid.
       */
      window.location.reload();
    } catch (error) {
      console.error(
        "Delete workspace error:",
        error
      );

      setDeleteError(
        error instanceof Error
          ? error.message
          : "Failed to delete workspace"
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div
        className="
          bg-white
          border
          border-zinc-200
          rounded-3xl
          p-8
          h-[240px]
          flex
          flex-col
          justify-between
        "
      >
        {/* =================================================
            WORKSPACE INFO
        ================================================= */}

        <div>
          <div className="flex justify-between">
            <h3 className="text-2xl font-medium">
              {workspace.name}
            </h3>

            <span
              className="
                px-3
                py-1
                rounded-full
                text-xs
                bg-zinc-100
              "
            >
              {workspace.status}
            </span>
          </div>

          <div className="mt-8 space-y-3">
            <p>
              Notes: {workspace.notes}
            </p>

            <p>
              Files: {workspace.files}
            </p>

            <p className="text-sm text-zinc-400">
              {workspace.updated}
            </p>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex items-center justify-between">

          <Link
            href={`/founder/workspace/${workspace.id}`}
            className="
              flex
              items-center
              gap-2
              font-medium
            "
          >
            Open Workspace

            <ArrowRight size={18} />
          </Link>

          <button
            type="button"
            onClick={() => {
              setDeleteError("");
              setDeleteOpen(true);
            }}
            disabled={deleting}
            className="
              w-10
              h-10
              rounded-xl
              border
              border-red-100
              text-red-500
              hover:bg-red-50
              flex
              items-center
              justify-center
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
            aria-label="Delete workspace"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </div>

      {/* =================================================
          DELETE ERROR
      ================================================= */}

      {deleteError && (
        <div
          className="
            mt-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-600
          "
        >
          {deleteError}
        </div>
      )}

      {/* =================================================
          DELETE MODAL
      ================================================= */}

     <DeleteWorkspaceModal
  open={deleteOpen}
  onClose={() => {
    if (!deleting) {
      setDeleteOpen(false);
    }
  }}
  workspaceName={workspace.name}
  deleting={deleting}
  onDelete={handleDeleteWorkspace}
/>
    </>
  );
}