"use client";

import { useState } from "react";

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadDocumentModal({
  isOpen,
  onClose,
}: UploadDocumentModalProps) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
  if (!isOpen) return null;
const handleUpload = async () => {
  if (!title || !file) {
    alert("Title and File Required");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);

    formData.append(
      "ventureId",
      "25ba5c5f-9898-4477-a38d-511c5b835cda"
    );

    const response = await fetch(
      "/api/documents/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Document Uploaded Successfully");

      setTitle("");
      setFile(null);

      onClose();
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Upload Failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md">

        <h2 className="text-xl font-bold text-white mb-6">
          Upload Document
        </h2>

        <input
         type="text"
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         placeholder="Document Title"
         className="w-full p-3 rounded-lg bg-zinc-800 text-white mb-4"
        />

        <input
          type="file"
          onChange={(e) =>
          setFile(e.target.files?.[0] || null)
          }
          className="w-full p-3 rounded-lg bg-zinc-800 text-white mb-4"
        />

        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 bg-zinc-700 text-white py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="flex-1 bg-yellow-400 text-black py-3 rounded-lg">
           {loading ? "Uploading..." : "Upload"}
           </button>

        </div>

      </div>
    </div>
  );
}