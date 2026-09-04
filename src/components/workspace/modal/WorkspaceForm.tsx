"use client";

import { useState } from "react";

import AdvisorSelector from "./AdvisorSelector";
import VisibilitySelector from "./VisibilitySelector";

interface Props {
  onClose: () => void;
  onCreated?: () => void;
}

export default function WorkspaceForm({
  onClose,
  onCreated,
}: Props) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateWorkspace() {
    setError("");

    if (!workspaceName.trim()) {
      setError("Workspace name is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspace_name: workspaceName,
          workspace_description: description,

          // Current active venture
          venture_id:
            "25ba5c5f-9898-4477-a38d-511c5b835cda",

          created_by: "Founder",
        }),
      });

      const result = await response.json();

      console.log("CREATE WORKSPACE:", result);

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to create workspace"
        );
      }

      // Workspace successfully created
      onCreated?.();

      onClose();
    } catch (error) {
      console.error(
        "Create Workspace Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create workspace"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className="
        h-[470px]
        overflow-y-auto
        px-6 py-5
        space-y-6
        "
      >
        <div>
          <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider">
            01 Workspace Information
          </p>
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-2">
            Workspace Name *
          </label>

          <input
            value={workspaceName}
            onChange={(e) =>
              setWorkspaceName(e.target.value)
            }
            placeholder="e.g. Project Aether"
            className="
            w-full
            h-11
            rounded-xl
            border
            border-zinc-200
            px-4
            text-sm
            outline-none
            focus:border-zinc-400
            "
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={4}
            placeholder="Briefly describe the venture's objectives..."
            className="
            w-full
            rounded-xl
            border
            border-zinc-200
            p-4
            resize-none
            text-sm
            outline-none
            focus:border-zinc-400
            "
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium mb-2">
              Category
            </label>

            <select
              className="
              w-full
              h-11
              rounded-xl
              border
              border-zinc-200
              px-4
              text-sm
              "
            >
              <option>
                Strategic Venture
              </option>
            </select>
          </div>

          <VisibilitySelector />
        </div>

        <div>
          <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider mb-4">
            02 Enable AI Advisors
          </p>

          <AdvisorSelector />
        </div>

        {error && (
          <div
            className="
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
            {error}
          </div>
        )}
      </div>

      <div
        className="
        h-[68px]
        border-t
        px-6
        flex items-center justify-end gap-4
        "
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="
          text-sm
          text-zinc-600
          disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          onClick={handleCreateWorkspace}
          disabled={loading}
          className="
          h-10
          px-5
          rounded-full
          bg-black
          text-white
          text-sm
          font-medium
          disabled:opacity-50
          "
        >
          {loading
            ? "Creating..."
            : "Create Workspace →"}
        </button>
      </div>
    </>
  );
}