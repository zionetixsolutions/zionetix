"use client";

import { useState } from "react";

import EditBrainMapModal from "@/components/brain-map/modal/EditBrainMapModal";

export default function BrainMapDetails() {
  const [editOpen, setEditOpen] =
    useState(false);

  return (
    <>
      <div
        className="
        bg-white
        border
        border-zinc-200
        rounded-[28px]
        p-6
        "
      >
        <h2
          className="
          text-2xl
          font-semibold
          mb-8
          "
        >
          Brain Map Details
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-xs text-zinc-400 uppercase">
              Name
            </p>

            <p className="mt-1 font-medium">
              Strategic Overview
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-400 uppercase">
              Related Workspace
            </p>

            <p className="mt-1 font-medium">
              Startup Alpha
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-400 uppercase">
              Created By
            </p>

            <p className="mt-1 font-medium">
              John Founder
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-400 uppercase">
              Total Nodes
            </p>

            <p className="mt-1 font-medium">
              12
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-400 uppercase">
              Status
            </p>

            <p className="mt-1 text-emerald-600">
              Active
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() =>
              setEditOpen(true)
            }
            className="
            w-full
            h-11
            rounded-xl
            border
            border-zinc-200
            hover:bg-zinc-50
            transition
            "
          >
            Edit Brain Map
          </button>

          <button
            className="
            w-full
            h-11
            rounded-xl
            border
            border-zinc-200
            hover:bg-zinc-50
            transition
            "
          >
            Export
          </button>

          <button
            className="
            w-full
            h-11
            rounded-xl
            text-red-600
            hover:bg-red-50
            transition
            "
          >
            Delete Brain Map
          </button>
        </div>
      </div>

      <EditBrainMapModal
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        initialData={{
          name: "Company Strategy",
          description:
            "Core strategic pillars and long-term objectives for the 2026 fiscal year.",
          category:
            "Product Strategy",
          status: "Active",
          visibility:
            "venture",
        }}
        onSave={(data) => {
          console.log(data);

          setEditOpen(false);
        }}
      />
    </>
  );
}