"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Plus, Download, Trash2 } from "lucide-react";
import UploadFileModal from "@/components/workspace_files/UploadFileModal";
import DeleteFileModal from "@/components/workspace_files/DeleteFileModal";
interface WorkspaceFile {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
}

export default function FilesPage() {

  const params = useParams();

  const workspaceId =
    params.workspaceId as string;

  const [files, setFiles] =
    useState<WorkspaceFile[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [isUploadModalOpen,setIsUploadModalOpen,] = useState(false);

  const [isDeleteModalOpen,setIsDeleteModalOpen,] = useState(false);

  const [selectedFile,setSelectedFile,] = useState<WorkspaceFile | null>(null);

  const fetchFiles =
    useCallback(async () => {

      try {

        const response =
          await fetch(
            `/api/workspace/files?workspaceId=${workspaceId}`
          );

        const data =
          await response.json();

        if (data.success) {

          setFiles(
            data.files
          );

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }, [workspaceId]);

  useEffect(() => {

    if (!workspaceId)
      return;

    const timer =
      setTimeout(() => {

        fetchFiles();

      }, 0);

    return () =>
      clearTimeout(timer);

  }, [
    workspaceId,
    fetchFiles,
  ]);

  return (
    <>
      <div className="p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Workspace Files
            </h1>

            <p className="text-zinc-400">
              File Management
            </p>

          </div>

          <button
            onClick={() =>
              setIsUploadModalOpen(true)
            }
            className="bg-yellow-400 text-black px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Upload File
          </button>

        </div>

        {loading ? (

          <p className="text-zinc-400">
            Loading...
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {files.map((file) => (

              <div
                key={file.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
              >

                <h2 className="text-lg font-semibold text-white break-all">
                  {file.file_name}
                </h2>

                <p className="text-zinc-400 mt-2">
                  {file.file_type}
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  {(file.file_size / 1024).toFixed(2)} KB
                </p>

                <div className="flex justify-end gap-3 mt-5">

                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download
                      size={18}
                      className="text-green-400"
                    />
                  </a>

                  <button onClick={() => {
                     setSelectedFile(file); setIsDeleteModalOpen(true);}}
                  >
                    <Trash2 size={18} className="text-red-400"/>
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <UploadFileModal
        isOpen={
          isUploadModalOpen
        }
        onClose={() =>
          setIsUploadModalOpen(false)
        }
        onSuccess={() =>
          fetchFiles()
        }
        workspaceId={
          workspaceId
        }
      />
      <DeleteFileModal
        isOpen={
        isDeleteModalOpen
         }
        onClose={() =>
        setIsDeleteModalOpen(false)
        }
        onSuccess={() =>
        fetchFiles()
        }
        file={selectedFile}
      />
    </>
  );

}