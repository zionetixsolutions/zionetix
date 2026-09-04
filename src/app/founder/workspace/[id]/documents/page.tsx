import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  FileType2,
  File,
  ExternalLink,
} from "lucide-react";

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

interface WorkspaceApiResponse {
  success: boolean;
  data?: {
    workspace: {
      id: string;
      workspace_name: string;
    };
    documents: WorkspaceDocument[];
  };
}

function getFileName(
  fileName: string | null
) {
  return fileName?.trim() || "Untitled Document";
}

function getFileExtension(
  fileName: string | null
) {
  if (!fileName?.trim()) {
    return "";
  }

  return (
    fileName
      .split(".")
      .pop()
      ?.toLowerCase() || ""
  );
}

function getFileIcon(
  fileName: string | null
) {
  const extension =
    getFileExtension(fileName);

  switch (extension) {
    case "pdf":
      return FileText;

    case "doc":
    case "docx":
      return FileType2;

    case "xls":
    case "xlsx":
    case "csv":
      return FileSpreadsheet;

    case "ppt":
    case "pptx":
      return FileType2;

    case "txt":
    case "md":
      return FileText;

    default:
      return File;
  }
}

function getFileIconColor(
  fileName: string | null
) {
  const extension =
    getFileExtension(fileName);

  switch (extension) {
    case "pdf":
      return "text-red-500";

    case "doc":
    case "docx":
      return "text-blue-500";

    case "xls":
    case "xlsx":
    case "csv":
      return "text-green-500";

    case "ppt":
    case "pptx":
      return "text-orange-500";

    default:
      return "text-zinc-500";
  }
}

function getFileType(
  fileName: string | null
) {
  const extension =
    getFileExtension(fileName);

  switch (extension) {
    case "pdf":
      return "PDF";

    case "doc":
    case "docx":
      return "Word";

    case "xls":
    case "xlsx":
      return "Excel";

    case "csv":
      return "CSV";

    case "ppt":
    case "pptx":
      return "PowerPoint";

    case "txt":
      return "Text";

    case "md":
      return "Markdown";

    default:
      return extension
        ? extension.toUpperCase()
        : "FILE";
  }
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Unknown";
  }

  return parsed.toLocaleString(
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

export default async function WorkspaceDocumentsPage({
  params,
}: PageProps) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  let result: WorkspaceApiResponse;

  try {
    const response = await fetch(
      `${baseUrl}/api/workspaces/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      notFound();
    }

    result =
      (await response.json()) as WorkspaceApiResponse;
  } catch (error) {
    console.error(
      "Workspace Documents Error:",
      error
    );

    notFound();
  }

  if (
    !result.success ||
    !result.data?.workspace
  ) {
    notFound();
  }

  const workspace =
    result.data.workspace;

  const documents =
    result.data.documents ?? [];

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
            All Documents
          </h1>

          <p className="mt-2 text-zinc-500">
            {workspace.workspace_name}
          </p>

        </div>

        <div className="text-sm text-zinc-500">
          {documents.length}{" "}
          {documents.length === 1
            ? "document"
            : "documents"}
        </div>

      </div>

      {/* DOCUMENTS */}

      {documents.length === 0 ? (

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
            No documents yet
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Upload a document from the workspace.
          </p>

        </div>

      ) : (

        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b bg-zinc-50">

                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-500">
                    FILE NAME
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-500">
                    TYPE
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-500">
                    UPLOADED
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-zinc-500">
                    UPLOADED BY
                  </th>

                  <th className="w-16" />

                </tr>

              </thead>

              <tbody>

                {documents.map(
                  (document) => {

                    const fileName =
                      getFileName(
                        document.title
                      );

                    const Icon =
                      getFileIcon(
                        document.title
                      );

                    const iconColor =
                      getFileIconColor(
                        document.title
                      );

                    return (
                      <tr
                        key={document.id}
                        className="
                          border-b
                          last:border-b-0
                          hover:bg-zinc-50
                          transition
                        "
                      >

                        {/* FILE */}

                        <td className="px-6 py-5">

                          {document.file_url ? (

                            <a
                              href={
                                document.file_url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                flex
                                items-center
                                gap-3
                                group
                              "
                            >

                              <Icon
                                size={21}
                                className={
                                  iconColor
                                }
                              />

                              <span
                                className="
                                  font-medium
                                  text-zinc-900
                                  group-hover:underline
                                  max-w-[400px]
                                  truncate
                                "
                                title={fileName}
                              >
                                {fileName}
                              </span>

                              <ExternalLink
                                size={14}
                                className="
                                  text-zinc-400
                                  opacity-0
                                  group-hover:opacity-100
                                  transition
                                "
                              />

                            </a>

                          ) : (

                            <div className="flex items-center gap-3">

                              <Icon
                                size={21}
                                className={
                                  iconColor
                                }
                              />

                              <span className="font-medium text-zinc-500">
                                {fileName}
                              </span>

                            </div>

                          )}

                        </td>

                        {/* TYPE */}

                        <td className="px-6 py-5 text-sm text-zinc-600">
                          {getFileType(
                            document.title
                          )}
                        </td>

                        {/* DATE */}

                        <td className="px-6 py-5 text-sm text-zinc-600">
                          {formatDate(
                            document.created_at
                          )}
                        </td>

                        {/* UPLOADED BY */}

                        <td className="px-6 py-5 text-sm text-zinc-600">
                          {document.uploaded_by ||
                            "Unknown"}
                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-5">

                          {document.file_url && (
                            <a
                              href={
                                document.file_url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Open document"
                              className="
                                inline-flex
                                items-center
                                justify-center
                                w-9
                                h-9
                                rounded-lg
                                hover:bg-zinc-100
                                transition
                              "
                            >
                              <ExternalLink
                                size={16}
                                className="text-zinc-500"
                              />
                            </a>
                          )}

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}