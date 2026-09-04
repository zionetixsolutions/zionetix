import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface WorkspaceNote {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Unknown";
  }

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function WorkspaceNotesPage({
  params,
}: PageProps) {
  /*
   * IMPORTANT
   * Next.js 16 params is a Promise.
   */
  const { id } = await params;

console.log(
  "Workspace Notes - Route ID:",
  id
);

if (!id) {
  notFound();
}
  /* =======================================================
     GET WORKSPACE
  ======================================================= */

  const {
    data: workspace,
    error: workspaceError,
  } = await supabase
    .from("workspaces")
    .select(
      "id, workspace_name, workspace_description"
    )
    .eq("id", id)
    .maybeSingle();

  if (workspaceError) {
    console.error(
      "Workspace Notes - Workspace Error:",
      workspaceError
    );
  }

  if (!workspace) {
    console.error(
      "Workspace Notes - Workspace not found:",
      id
    );

    notFound();
  }

  /* =======================================================
     GET NOTES
  ======================================================= */

  const {
    data: notes,
    error: notesError,
  } = await supabase
    .from("workspace_notes")
    .select("*")
    .eq("workspace_id", id)
    .order("created_at", {
      ascending: false,
    });

  if (notesError) {
    console.error(
      "Workspace Notes - Notes Error:",
      notesError
    );

    return (
      <div className="max-w-[1400px] mx-auto">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-xl font-semibold text-red-600">
            Failed to load notes
          </h1>

          <p className="mt-2 text-sm text-red-500">
            {notesError.message}
          </p>

          <Link
            href={`/founder/workspace/${id}`}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-black
              px-5
              py-3
              text-sm
              font-medium
              text-white
            "
          >
            <ArrowLeft size={16} />
            Back to Workspace
          </Link>
        </div>
      </div>
    );
  }

  const workspaceNotes =
    (notes ?? []) as WorkspaceNote[];

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            href={`/founder/workspace/${id}`}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-zinc-500
              hover:text-black
              mb-5
            "
          >
            <ArrowLeft size={16} />

            Back to Workspace
          </Link>

          <h1 className="text-4xl font-bold tracking-tight">
            All Notes
          </h1>

          <p className="mt-2 text-zinc-500">
            {workspace.workspace_name}
          </p>

        </div>

        <div className="text-sm text-zinc-500">
          {workspaceNotes.length}{" "}
          {workspaceNotes.length === 1
            ? "note"
            : "notes"}
        </div>

      </div>

      {/* NOTES */}

      {workspaceNotes.length === 0 ? (

        <div
          className="
            bg-white
            border
            border-zinc-200
            rounded-3xl
            py-20
            text-center
          "
        >

          <FileText
            size={40}
            className="mx-auto text-zinc-300"
          />

          <h2 className="mt-4 font-semibold text-lg">
            No notes yet
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Create a note from the workspace.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-6">

          {workspaceNotes.map((note) => (

            <div
              key={note.id}
              className="
                bg-white
                border
                border-zinc-200
                rounded-3xl
                p-6
                hover:border-zinc-300
                transition
              "
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-xl font-semibold">
                    {note.title ||
                      "Untitled Note"}
                  </h2>

                  <p className="mt-2 text-xs text-zinc-400">
                    Created{" "}
                    {formatDate(
                      note.created_at
                    )}
                  </p>

                </div>

                <FileText
                  size={20}
                  className="text-zinc-400"
                />

              </div>

              <div
                className="
                  mt-5
                  text-sm
                  text-zinc-600
                  leading-7
                  whitespace-pre-wrap
                "
              >
                {note.content}
              </div>

              <div
                className="
                  mt-6
                  pt-4
                  border-t
                  text-xs
                  text-zinc-400
                "
              >
                Updated{" "}
                {formatDate(
                  note.updated_at
                )}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}