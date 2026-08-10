"use client";

import { useState } from "react";

import { WorkspaceDetail } from "@/types/workspace";

import EditWorkspaceModal from "@/components/workspace/modal/EditWorkspaceModal";

interface Props {
  workspace: WorkspaceDetail;
}

export default function WorkspaceHero({
  workspace,
}: Props) {
  const [editOpen, setEditOpen] =
    useState(false);

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1
              className="
                text-5xl
                font-bold
                tracking-tight
              "
            >
              {workspace.name}
            </h1>

            <span
              className="
                px-3
                py-1
                rounded-lg
                bg-emerald-50
                text-emerald-600
                text-sm
                font-medium
              "
            >
              {workspace.status}
            </span>
          </div>

          <p
            className="
              mt-4
              text-lg
              text-zinc-500
              max-w-3xl
            "
          >
            {workspace.description}
          </p>
        </div>

        <button
          onClick={() =>
            setEditOpen(true)
          }
          className="
            h-12
            px-6
            rounded-xl
            bg-black
            text-white
            font-medium
            hover:opacity-90
            transition
          "
        >
          Edit Workspace
        </button>
      </div>

      <EditWorkspaceModal
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
      />
    </>
  );
}