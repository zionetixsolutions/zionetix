"use client";

import { useEffect, useState } from "react";

interface Document {
  id: string;
  document_id: string;
  title: string;
  file_url: string;
  created_at: string;
}

export default function TeamDocumentsPage() {
  const [documents, setDocuments] =
    useState<Document[]>([]);
useEffect(() => {
  const loadDocuments = async () => {
    const response =
      await fetch("/api/documents");

    const data =
      await response.json();

    if (data.success) {
      setDocuments(data.documents);
    }
  };

  loadDocuments();
}, []);
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-white mb-6">
        Documents
      </h1>

      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-3"
        >
          <h3 className="text-white">
            {doc.title}
          </h3>

          <a
            href={doc.file_url}
            target="_blank"
            className="text-yellow-400"
          >
            Download
          </a>
        </div>
      ))}

    </div>
  );
}