import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  FileType2,
  File,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface WorkspaceDocument {
  id: string;
  document_id: string;
  venture_id: string;
  title: string | null;
  file_url: string | null;
  uploaded_by: string | null;
  created_at: string;
}

/* =========================================================
   HELPERS
========================================================= */

function getExtension(fileName: string) {
  return (
    fileName.split(".").pop()?.toLowerCase() || ""
  );
}

function getIcon(fileName: string) {
  const ext = getExtension(fileName);

  switch (ext) {
    case "pdf":
      return FileText;

    case "doc":
    case "docx":
      return FileType2;

    case "xls":
    case "xlsx":
    case "csv":
      return FileSpreadsheet;

    default:
      return File;
  }
}

function getIconColor(fileName: string) {
  const ext = getExtension(fileName);

  switch (ext) {
    case "pdf":
      return "text-red-500";

    case "doc":
    case "docx":
      return "text-blue-500";

    case "xls":
    case "xlsx":
    case "csv":
      return "text-green-500";

    default:
      return "text-zinc-500";
  }
}

function getType(fileName: string) {
  const ext = getExtension(fileName);

  switch (ext) {
    case "pdf":
      return "PDF";

    case "doc":
    case "docx":
      return "Word";

    case "xls":
    case "xlsx":
      return "Excel";

    case "ppt":
    case "pptx":
      return "PowerPoint";

    case "csv":
      return "CSV";

    default:
      return ext.toUpperCase() || "FILE";
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function WorkspaceDocumentsPage({
  params,
}: PageProps) {
  const { id } = await params;

  /* Workspace */

  const {
    data: workspace,
    error: workspaceError,
  } = await supabase
    .from("workspaces")
    .select(
      "id, venture_id, workspace_name"
    )
    .eq("id", id)
    .single();

  if (workspaceError || !workspace) {
    notFound();
  }

  /* Documents */

  const {
    data: documents,
    error: documentsError,
  } = await supabase
    .from("document")
    .select("*")
    .eq("venture_id", workspace.venture_id)
    .order("created_at", {
      ascending: false,
    });

  if (documentsError) {
    console.error(documentsError);
  }

  const docs =
    (documents as WorkspaceDocument[]) || [];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/founder/workspace/${id}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-black mb-5"
          >
            <ArrowLeft size={16} />
            Back to Workspace
          </Link>

          <h1 className="text-4xl font-bold tracking-tight">
            All Documents
          </h1>

          <p className="mt-2 text-zinc-500">
            {workspace.workspace_name}
          </p>
        </div>

        <div className="text-sm text-zinc-500">
          {docs.length}{" "}
          {docs.length === 1
            ? "document"
            : "documents"}
        </div>
      </div>

      {/* EMPTY */}

      {docs.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-3xl py-20 text-center">
          <FileText
            size={42}
            className="mx-auto text-zinc-300"
          />

          <h2 className="mt-4 text-lg font-semibold">
            No documents yet
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Upload a document from the workspace.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b text-xs text-zinc-500">
                <th className="px-6 py-4 text-left">
                  FILE
                </th>

                <th className="px-6 py-4 text-left">
                  TYPE
                </th>

                <th className="px-6 py-4 text-left">
                  UPLOADED
                </th>

                <th className="px-6 py-4 text-left">
                  BY
                </th>
              </tr>
            </thead>

            <tbody>
              {docs.map((doc) => {
                const name =
                  doc.title ||
                  "Untitled Document";

                const Icon =
                  getIcon(name);

                return (
                  <tr
                    key={doc.id}
                    className="border-b last:border-0 hover:bg-zinc-50"
                  >
                    <td className="px-6 py-5">
                      <a
                        href={
                          doc.file_url || "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <Icon
                          size={20}
                          className={getIconColor(
                            name
                          )}
                        />

                        <span className="font-medium">
                          {name}
                        </span>
                      </a>
                    </td>

                    <td className="px-6 py-5 text-zinc-600">
                      {getType(name)}
                    </td>

                    <td className="px-6 py-5 text-zinc-600">
                      {formatDate(
                        doc.created_at
                      )}
                    </td>

                    <td className="px-6 py-5 text-zinc-600">
                      {doc.uploaded_by ||
                        "Unknown"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}