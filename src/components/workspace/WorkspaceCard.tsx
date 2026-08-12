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
            <p>Notes: {workspace.notes}</p>

            <p>Files: {workspace.files}</p>

            <p className="text-sm text-zinc-400">
              {workspace.updated}
            </p>
          </div>
        </div>

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
            onClick={() =>
              setDeleteOpen(true)
            }
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
            "
          >
            <Trash2 size={18} />
          </button>

        </div>
      </div>

      <DeleteWorkspaceModal
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
        workspaceName={workspace.name}
        onDelete={() => {

          console.log(
            "Delete Workspace:",
            workspace.id
          );

          setDeleteOpen(false);

        }}
      />
    </>
  );
}