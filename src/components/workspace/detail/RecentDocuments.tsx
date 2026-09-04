"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  FileText,
  FileSpreadsheet,
  FileType2,
  File,
  Upload,
  MoreHorizontal,
  ChevronRight,
  X,
} from "lucide-react";

import Link from "next/link";

interface WorkspaceDocument {
  id: string;
  document_id: string;
  venture_id: string;
  title: string | null;
  file_url: string | null;
  uploaded_by: string | null;
  created_at: string;
}

interface Props {
  workspaceId: string;
  documents: WorkspaceDocument[];
}

/* =========================================================
   GET FILE NAME
========================================================= */

function getFileName(
  fileName: string | null | undefined
) {
  if (!fileName?.trim()) {
    return "Untitled Document";
  }

  return fileName;
}

/* =========================================================
   GET FILE EXTENSION
========================================================= */

function getFileExtension(
  fileName: string | null | undefined
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

/* =========================================================
   FILE ICON
========================================================= */

function getFileIcon(
  fileName: string | null | undefined
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

/* =========================================================
   FILE ICON COLOR
========================================================= */

function getFileIconColor(
  fileName: string | null | undefined
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

    case "txt":
    case "md":
      return "text-zinc-500";

    default:
      return "text-zinc-500";
  }
}

/* =========================================================
   FILE TYPE
========================================================= */

function getFileType(
  fileName: string | null | undefined
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

    case "ppt":
    case "pptx":
      return "PowerPoint";

    case "txt":
      return "Text";

    case "csv":
      return "CSV";

    case "md":
      return "Markdown";

    default:
      return extension
        ? extension.toUpperCase()
        : "FILE";
  }
}

/* =========================================================
   FILE TYPE FILTER VALUE
========================================================= */

function getFileTypeFilter(
  fileName: string | null | undefined
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
    case "csv":
      return "Excel";

    case "ppt":
    case "pptx":
      return "PowerPoint";

    case "txt":
      return "Text";

    case "md":
      return "Markdown";

    default:
      return "Other";
  }
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date: string) {
  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "Unknown";
  }

  return parsedDate.toLocaleString(
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
   COMPONENT
========================================================= */

export default function RecentDocuments({
  workspaceId,
  documents,
}: Props) {
  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("newest");

  const [showFilters, setShowFilters] =
    useState(false);

  /* =======================================================
     OPEN FILE PICKER
  ======================================================= */

  function openFilePicker() {
    setError("");

    fileInputRef.current?.click();
  }

  /* =======================================================
     HANDLE FILE UPLOAD
  ======================================================= */

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "workspace_id",
        workspaceId
      );

      const response =
        await fetch(
          "/api/documents",
          {
            method: "POST",
            body: formData,
          }
        );

      let result: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        result =
          await response.json();
      } catch {
        result = {};
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to upload document"
        );
      }

      window.location.reload();
    } catch (uploadError) {
      console.error(
        "Document upload error:",
        uploadError
      );

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload document"
      );
    } finally {
      setUploading(false);
    }
  }

  /* =======================================================
     OPEN DOCUMENT
  ======================================================= */

  function handleOpenDocument(
    document: WorkspaceDocument
  ) {
    if (!document.file_url) {
      setError(
        "Document URL is not available"
      );

      return;
    }

    window.open(
      document.file_url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  /* =======================================================
     FILTER + SORT DOCUMENTS
  ======================================================= */

  const filteredDocuments =
    useMemo(() => {
      const searchValue =
        search.trim().toLowerCase();

      const result =
        documents.filter(
          (document) => {
            const fileName =
              getFileName(
                document.title
              );

            const matchesSearch =
              !searchValue ||
              fileName
                .toLowerCase()
                .includes(
                  searchValue
                );

            const matchesType =
              typeFilter === "All" ||
              getFileTypeFilter(
                document.title
              ) === typeFilter;

            return (
              matchesSearch &&
              matchesType
            );
          }
        );

      return result.sort(
        (a, b) => {
          if (
            sortBy === "newest"
          ) {
            return (
              new Date(
                b.created_at
              ).getTime() -
              new Date(
                a.created_at
              ).getTime()
            );
          }

          if (
            sortBy === "oldest"
          ) {
            return (
              new Date(
                a.created_at
              ).getTime() -
              new Date(
                b.created_at
              ).getTime()
            );
          }

          const nameA =
            getFileName(
              a.title
            ).toLowerCase();

          const nameB =
            getFileName(
              b.title
            ).toLowerCase();

          if (
            sortBy === "name-asc"
          ) {
            return nameA.localeCompare(
              nameB
            );
          }

          if (
            sortBy === "name-desc"
          ) {
            return nameB.localeCompare(
              nameA
            );
          }

          return 0;
        }
      );
    }, [
      documents,
      search,
      typeFilter,
      sortBy,
    ]);

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  function clearFilters() {
    setSearch("");
    setTypeFilter("All");
    setSortBy("newest");
  }

  const hasActiveFilters =
    search.trim() !== "" ||
    typeFilter !== "All" ||
    sortBy !== "newest";

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="px-6 py-5 border-b">

        <div className="flex items-center justify-between gap-4">

          <div>
            <h3 className="font-semibold text-lg">
              Recent Documents
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              {documents.length}{" "}
              {documents.length === 1
                ? "document"
                : "documents"}{" "}
              in this workspace
            </p>
          </div>

          <div className="flex items-center gap-2">

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={
                handleFileChange
              }
              accept="
                .pdf,
                .doc,
                .docx,
                .xls,
                .xlsx,
                .ppt,
                .pptx,
                .txt,
                .csv,
                .md
              "
            />

            <button
              type="button"
              onClick={
                openFilePicker
              }
              disabled={uploading}
              className="
                flex
                items-center
                gap-2
                bg-black
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                hover:opacity-90
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <Upload size={16} />

              {uploading
                ? "Uploading..."
                : "Upload Document"}
            </button>

          </div>
        </div>

        {/* =================================================
            SEARCH + FILTER BUTTON
        ================================================= */}

        {documents.length > 0 && (
          <div className="flex items-center gap-2 mt-5">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={17}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search documents..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-200
                  bg-zinc-50
                  py-2.5
                  pl-10
                  pr-4
                  text-sm
                  outline-none
                  transition
                  focus:border-zinc-400
                  focus:bg-white
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-zinc-400
                    hover:text-zinc-700
                  "
                >
                  <X size={15} />
                </button>
              )}

            </div>

            {/* FILTER */}

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  !showFilters
                )
              }
              className={`
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-2.5
                text-sm
                font-medium
                transition
                ${
                  showFilters ||
                  typeFilter !== "All"
                    ? "border-black bg-black text-white"
                    : "border-zinc-200 hover:bg-zinc-50"
                }
              `}
            >
              <SlidersHorizontal
                size={16}
              />

              Filter
            </button>

            {/* SORT */}

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
                className="
                  appearance-none
                  rounded-xl
                  border
                  border-zinc-200
                  bg-white
                  py-2.5
                  pl-10
                  pr-9
                  text-sm
                  font-medium
                  outline-none
                  cursor-pointer
                  hover:bg-zinc-50
                  focus:border-zinc-400
                "
              >
                <option value="newest">
                  Newest first
                </option>

                <option value="oldest">
                  Oldest first
                </option>

                <option value="name-asc">
                  Name A–Z
                </option>

                <option value="name-desc">
                  Name Z–A
                </option>
              </select>

              <ArrowUpDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              />

            </div>

          </div>
        )}

        {/* =================================================
            FILTER PANEL
        ================================================= */}

        {showFilters &&
          documents.length > 0 && (
            <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">

              <div className="flex items-center justify-between mb-3">

                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Document Type
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="
                      text-xs
                      font-medium
                      text-zinc-500
                      hover:text-black
                    "
                  >
                    Clear filters
                  </button>
                )}

              </div>

              <div className="flex flex-wrap gap-2">

                {[
                  "All",
                  "PDF",
                  "Word",
                  "Excel",
                  "PowerPoint",
                  "Text",
                  "Markdown",
                  "Other",
                ].map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setTypeFilter(
                          type
                        )
                      }
                      className={`
                        rounded-lg
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        transition
                        ${
                          typeFilter ===
                          type
                            ? "bg-black text-white"
                            : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
                        }
                      `}
                    >
                      {type}
                    </button>
                  )
                )}

              </div>
            </div>
          )}

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          className="
            mx-6
            mt-4
            rounded-lg
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

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {documents.length === 0 ? (

        <div className="px-6 py-12 text-center">

          <div
            className="
              mx-auto
              w-12
              h-12
              rounded-xl
              bg-zinc-100
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <FileText
              size={22}
              className="text-zinc-400"
            />
          </div>

          <p className="font-medium text-zinc-800">
            No documents yet
          </p>

          <p className="text-sm text-zinc-500 mt-1">
            Upload a document to this
            workspace to see it here.
          </p>

          <button
            type="button"
            onClick={
              openFilePicker
            }
            disabled={uploading}
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-zinc-900
              px-4
              py-2
              text-sm
              font-medium
              text-white
              hover:bg-black
              disabled:opacity-50
            "
          >
            <Upload size={15} />

            Upload Document
          </button>

        </div>

      ) : filteredDocuments.length === 0 ? (

        /* =================================================
           NO SEARCH RESULTS
        ================================================= */

        <div className="px-6 py-12 text-center">

          <div
            className="
              mx-auto
              w-12
              h-12
              rounded-xl
              bg-zinc-100
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <Search
              size={21}
              className="text-zinc-400"
            />
          </div>

          <p className="font-medium text-zinc-800">
            No documents found
          </p>

          <p className="text-sm text-zinc-500 mt-1">
            Try changing your search or
            document type filter.
          </p>

          <button
            type="button"
            onClick={
              clearFilters
            }
            className="
              mt-4
              text-sm
              font-medium
              text-zinc-700
              hover:text-black
            "
          >
            Clear filters
          </button>

        </div>

      ) : (

        <>

          {/* =================================================
              RESULT COUNT
          ================================================= */}

          {hasActiveFilters && (
            <div className="px-6 py-3 border-b bg-zinc-50">

              <p className="text-xs text-zinc-500">

                Showing{" "}
                <span className="font-semibold text-zinc-800">
                  {filteredDocuments.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-zinc-800">
                  {documents.length}
                </span>{" "}
                documents

              </p>

            </div>
          )}

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b text-xs text-zinc-500">

                  <th className="text-left py-4 px-6 font-medium">
                    FILE NAME
                  </th>

                  <th className="text-left py-4 px-6 font-medium">
                    TYPE
                  </th>

                  <th className="text-left py-4 px-6 font-medium">
                    UPLOADED
                  </th>

                  <th className="text-left py-4 px-6 font-medium">
                    UPLOADED BY
                  </th>

                  <th className="w-10" />

                </tr>

              </thead>

              <tbody>

                {filteredDocuments.map(
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
                        key={
                          document.id
                        }
                        className="
                          border-b
                          last:border-b-0
                          hover:bg-zinc-50
                          transition
                        "
                      >

                        {/* FILE NAME */}

                        <td className="px-6 py-4">

                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDocument(
                                document
                              )
                            }
                            disabled={
                              !document.file_url
                            }
                            className="
                              flex
                              items-center
                              gap-3
                              text-left
                              disabled:cursor-default
                            "
                          >

                            <Icon
                              size={20}
                              className={
                                iconColor
                              }
                            />

                            <span
                              className="
                                font-medium
                                text-zinc-900
                                hover:text-black
                                max-w-[280px]
                                truncate
                              "
                              title={
                                fileName
                              }
                            >
                              {fileName}
                            </span>

                          </button>

                        </td>

                        {/* TYPE */}

                        <td className="px-6 py-4 text-zinc-600">

                          {getFileType(
                            document.title
                          )}

                        </td>

                        {/* UPLOADED */}

                        <td className="px-6 py-4 text-zinc-600">

                          {formatDate(
                            document.created_at
                          )}

                        </td>

                        {/* UPLOADED BY */}

                        <td className="px-6 py-4">

                          <span className="text-sm text-zinc-700">

                            {document.uploaded_by ||
                              "Unknown"}

                          </span>

                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-4">

                          <button
                            type="button"
                            className="
                              p-1
                              rounded-lg
                              hover:bg-zinc-100
                              transition
                            "
                            aria-label="Document options"
                          >

                            <MoreHorizontal
                              size={16}
                              className="text-zinc-500"
                            />

                          </button>

                        </td>

                      </tr>

                    );
                  }
                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="px-6 py-4">

            <Link
  href={`/founder/workspace/${workspaceId}/documents`}
  className="
    flex
    items-center
    gap-2
    text-sm
    font-medium
    text-zinc-700
    hover:text-black
  "
>
  View all documents

  <ChevronRight size={16} />
</Link>

          </div>

        </>

      )}

    </div>
  );
}