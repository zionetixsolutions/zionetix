"use client";

import { Plus, Search, Download, Trash2 } from "lucide-react";
import { useEffect,useState } from "react";
import UploadDocumentModal from "@/components/documents/UploadDocumentModal";
interface Document {
  id: string;
  document_id: string;
  title: string;
  uploaded_by: string;
  created_at: string;
  file_url: string;
}
export default function DocumentsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] =
  useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (data.success) {
        console.log("DOCUMENTS:", data.documents);
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  loadDocuments();
}, []);
const deleteDocument = async (
  documentID: string
) => {
  const confirmDelete = confirm(
    "Delete this document?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `/api/documents/${documentID}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Document Deleted");

      setDocuments((prev) =>
        prev.filter(
          (doc) =>
            doc.document_id !== documentID
        )
      );
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
console.log("STATE DOCUMENTS:", documents);
console.log("COUNT:", documents.length);
  return (
    <>
    <div className="p-8">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Documents Workspace
          </h1>

          <p className="text-zinc-400 mt-2">
            Upload and manage project documents
          </p>
        </div>

         <button onClick={() => setIsUploadModalOpen(true)} className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
          <Plus size={18} />
          Upload Document
         </button>

         </div>

         <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
          <Search size={18} className="text-zinc-500" />

          <input
            type="text"
            placeholder="Search documents..."
            className="bg-transparent outline-none text-white w-full"
          />
         </div>
         </div>

         <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

          <table className="w-full">

          <thead className="bg-zinc-800">
            <tr>
              <th className="text-left px-6 py-4 text-zinc-300">
                Document ID
              </th>

              <th className="text-left px-6 py-4 text-zinc-300">
                Title
              </th>

              <th className="text-left px-6 py-4 text-zinc-300">
                Uploaded By
              </th>

              <th className="text-left px-6 py-4 text-zinc-300">
                Created At
              </th>

              <th className="text-right px-6 py-4 text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
  {loading ? (
    <tr>
      <td
        colSpan={5}
        className="text-center py-8 text-zinc-400"
      >
        Loading Documents...
      </td>
    </tr>
  ) : documents.length === 0 ? (
    <tr>
      <td
        colSpan={5}
        className="text-center py-8 text-zinc-400"
      >
        No Documents Found
      </td>
    </tr>
  ) : (
    documents.map((doc) => (
      <tr
        key={doc.document_id}
        className="border-t border-zinc-800"
      >
        <td className="px-6 py-4 text-yellow-400">
          {doc.document_id}
        </td>

        <td className="px-6 py-4 text-white">
          {doc.title}
        </td>

        <td className="px-6 py-4 text-zinc-300">
          {doc.uploaded_by || "Founder"}
        </td>

        <td className="px-6 py-4 text-zinc-300">
          {new Date(
            doc.created_at
          ).toLocaleDateString()}
        </td>

        <td className="px-6 py-4">
          <div className="flex justify-end gap-3">

            <a
              href={doc.file_url}
              target="_blank"
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700">
              <Download size={16} className="text-green-400"/>
            </a>

            <button onClick={() =>deleteDocument(doc.document_id)}className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700">
              <Trash2 size={16} className="text-red-500"/>
            </button>

          </div>
        </td>
      </tr>
    ))
  )}
</tbody>


        </table>

      </div>

    </div>
    <UploadDocumentModal
      isOpen={isUploadModalOpen}
      onClose={() =>
        setIsUploadModalOpen(false)
      }
    />
  </>
  );
}