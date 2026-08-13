"use client";

import { useState } from "react";

import {
  X,
  Info,
  Briefcase,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";

import { WorkspaceDetail } from "@/types/workspace";

interface Props {
  workspace: WorkspaceDetail;
  onClose: () => void;
}

export default function EditWorkspaceForm({
  workspace,
  onClose,
}: Props) {
  const [workspaceName, setWorkspaceName] =
    useState(workspace.name);

  const [description, setDescription] =
    useState(workspace.description);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSave() {
    setError("");

    if (!workspaceName.trim()) {
      setError("Workspace name is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/workspaces/${workspace.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workspace_name:
              workspaceName.trim(),

            workspace_description:
              description.trim(),
          }),
        }
      );

      const result = await response.json();

      console.log(
        "UPDATE WORKSPACE:",
        result
      );

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to update workspace"
        );
      }

      onClose();

      // Refresh the current detail page
      window.location.reload();
    } catch (error) {
      console.error(
        "Update Workspace Error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update workspace"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      w-[446px]
      rounded-2xl
      bg-white
      shadow-2xl
      overflow-hidden
      "
    >
      {/* HEADER */}

      <div className="px-6 pt-5 pb-4 border-b">
        <div className="flex items-start justify-between">
          <div>
            <h2
              className="
              text-[18px]
              font-semibold
              text-zinc-900
              "
            >
              Edit Workspace
            </h2>

            <p
              className="
              text-[11px]
              text-zinc-500
              mt-1
              "
            >
              Update workspace information and
              configuration settings.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
          >
            <X
              size={18}
              className="text-zinc-500"
            />
          </button>
        </div>
      </div>

      {/* BODY */}

      <div
        className="
        px-6
        py-5
        max-h-[540px]
        overflow-y-auto
        "
      >
        {/* Workspace Information */}

        <div className="flex items-center gap-2 mb-3">
          <Info
            size={15}
            className="text-amber-700"
          />

          <h3
            className="
            text-[13px]
            font-semibold
            "
          >
            Workspace Information
          </h3>
        </div>

        <div className="h-px bg-zinc-200 mb-4" />

        {/* Name */}

        <div className="mb-4">
          <label
            className="
            text-[11px]
            font-medium
            block
            mb-2
            "
          >
            Workspace Name
          </label>

          <input
            value={workspaceName}
            onChange={(e) =>
              setWorkspaceName(
                e.target.value
              )
            }
            className="
            w-full
            h-10
            rounded-lg
            border
            border-zinc-200
            px-3
            text-sm
            outline-none
            focus:border-zinc-400
            "
          />
        </div>

        {/* Description */}

        <div className="mb-4">
          <label
            className="
            text-[11px]
            font-medium
            block
            mb-2
            "
          >
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
            w-full
            h-16
            rounded-lg
            border
            border-zinc-200
            px-3
            py-2
            text-sm
            resize-none
            outline-none
            focus:border-zinc-400
            "
          />
        </div>

        {/* CATEGORY + VISIBILITY */}

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label
              className="
              text-[11px]
              font-medium
              block
              mb-2
              "
            >
              Category
            </label>

            <div
              className="
              h-10
              border
              border-zinc-200
              rounded-lg
              px-3
              flex
              items-center
              justify-between
              "
            >
              <span className="text-sm">
                Strategy & Planning
              </span>

              <ChevronDown size={15} />
            </div>
          </div>

          <div>
            <label
              className="
              text-[11px]
              font-medium
              block
              mb-2
              "
            >
              Visibility
            </label>

            <div
              className="
              h-10
              border
              border-zinc-200
              rounded-lg
              flex
              overflow-hidden
              "
            >
              <button className="flex-1 text-sm">
                Private
              </button>

              <button
                className="
                flex-1
                bg-amber-700
                text-white
                text-sm
                "
              >
                Team
              </button>
            </div>
          </div>
        </div>

        {/* AI ADVISORS */}

        <div className="flex items-center gap-2 mb-3">
          <Briefcase
            size={15}
            className="text-amber-700"
          />

          <h3
            className="
            text-[13px]
            font-semibold
            "
          >
            AI Advisors
          </h3>
        </div>

        <div className="h-px bg-zinc-200 mb-4" />

        <div className="grid grid-cols-2 gap-3">
          {[
            "AI Tech Advisor",
            "AI Market Advisor",
            "AI Legal Advisor",
            "AI Finance Advisor",
          ].map((advisor) => (
            <label
              key={advisor}
              className="
              border
              border-zinc-200
              rounded-xl
              p-3
              flex
              gap-3
              cursor-pointer
              "
            >
              <input
                type="checkbox"
                defaultChecked={
                  advisor !==
                  "AI Legal Advisor"
                }
              />

              <div>
                <p
                  className="
                  text-[13px]
                  font-medium
                  "
                >
                  {advisor}
                </p>

                <p
                  className="
                  text-[11px]
                  text-zinc-500
                  "
                >
                  Advisor Module
                </p>
              </div>
            </label>
          ))}
        </div>

        {/* MODULES */}

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <LayoutGrid
              size={15}
              className="text-amber-700"
            />

            <span
              className="
              text-[13px]
              font-semibold
              "
            >
              Workspace Modules
            </span>

            <ChevronDown
              size={15}
              className="ml-auto"
            />
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
            mt-5
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-3
            py-2
            text-xs
            text-red-600
            "
          >
            {error}
          </div>
        )}
      </div>

      {/* FOOTER */}

      <div
        className="
        border-t
        px-6
        py-4
        flex
        justify-end
        gap-3
        "
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="
          h-10
          px-6
          rounded-lg
          border
          border-zinc-200
          text-sm
          disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="
          h-10
          px-8
          rounded-lg
          bg-amber-700
          text-white
          text-sm
          font-medium
          disabled:opacity-50
          "
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
}