"use client";

import { useState } from "react";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Plus,
} from "lucide-react";

import CreateWorkspaceModal from "@/components/workspace/modal/CreateWorkspaceModal";

interface Props {
  onWorkspaceCreated?: () => void;
}

export default function WorkspaceSearchBar({
  onWorkspaceCreated,
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            placeholder="Search workspaces..."
            className="w-full h-12 rounded-xl border border-zinc-200 pl-12 pr-4 outline-none"
          />
        </div>

        <button className="h-12 px-6 rounded-xl border border-zinc-200 flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filter
        </button>

        <button className="h-12 px-6 rounded-xl border border-zinc-200 flex items-center gap-2">
          <ArrowUpDown size={16} />
          Sort
        </button>

        <button
          onClick={() => setOpenModal(true)}
          className="h-12 px-6 rounded-xl bg-black text-white flex items-center gap-2"
        >
          <Plus size={16} />
          Create Workspace
        </button>
      </div>

      <CreateWorkspaceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={onWorkspaceCreated}
      />
    </>
  );
}