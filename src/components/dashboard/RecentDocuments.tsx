"use client";

import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

type DocumentItem = {
  id: string;
  document_id: string;
  title: string;
  file_url: string;
  uploaded_by: string | null;
  created_at: string;
};

export default function RecentDocuments() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("/api/dashboard/documents");

        const result = await response.json();

        if (result.success) {
          setDocs(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const getFileType = (fileUrl: string) => {
    const fileName = fileUrl.split("/").pop() || fileUrl;

    const extension = fileName
      .split(".")
      .pop()
      ?.toUpperCase();

    return extension || "FILE";
  };

  const formatDate = (date: string) => {
    const documentDate = new Date(date);
    const today = new Date();

    const diffTime =
      today.getTime() - documentDate.getTime();

    const diffDays = Math.floor(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return "Today";
    }

    if (diffDays === 1) {
      return "Yesterday";
    }

    return `${diffDays} Days Ago`;
  };

  return (
    <GlassCard>
      <div
        className="
          bg-white
          border
          border-zinc-200
          rounded-2xl
          overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
            flex
            justify-between
            px-6
            py-4
            border-b
          "
        >
          <h2 className="font-semibold">
            Recent Documents
          </h2>

          <button className="text-sm">
            VIEW ALL
          </button>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="px-6 py-8 text-sm text-zinc-400">
            Loading documents...
          </div>
        ) : docs.length === 0 ? (
          <div className="px-6 py-8 text-sm text-zinc-400">
            No documents found.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-zinc-400 text-sm">
                <th className="px-6 py-4">
                  Document Name
                </th>

                <th>Type</th>

                <th>Date Modified</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {docs.map((doc) => (
                <tr
                  key={doc.id}
                  className="
                    border-t
                    hover:bg-zinc-50
                    transition-all
                  "
                >
                  <td className="px-6 py-4">
                    {doc.title}
                  </td>

                  <td>
                    {getFileType(doc.file_url)}
                  </td>

                  <td>
                    {formatDate(doc.created_at)}
                  </td>

                  <td>
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-xs
                      "
                    >
                      Available
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </GlassCard>
  );
}