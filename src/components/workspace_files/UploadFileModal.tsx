"use client";

import { useState } from "react";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  workspaceId: string;
}

export default function UploadFileModal({
  isOpen,
  onClose,
  onSuccess,
  workspaceId,
}: UploadFileModalProps) {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  if (!isOpen) return null;

  async function handleUpload() {

    if (!file) return;

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const uploadResponse =
  await fetch(
    "/api/workspace/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );
console.log(
  uploadResponse.status
);
      const uploadData =
        await uploadResponse.json();

      if (!uploadData.success) {

        alert(
          uploadData.message
        );

        return;

      }

      const saveResponse =
        await fetch(
          "/api/workspace/files",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              workspaceId,
              fileName:
                uploadData.fileName,
              fileUrl:
                uploadData.fileUrl,
              fileType:
                uploadData.fileType,
              fileSize:
                uploadData.fileSize,
              uploadedBy:
                "Founder",
            }),
          }
        );

      const saveData =
        await saveResponse.json();

      if (saveData.success) {

        onSuccess();
        onClose();

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold text-white mb-6">
          Upload File
        </h2>

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ??
              null
            )
          }
          className="w-full text-white mb-6"
        />

        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 bg-zinc-700 text-white py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={
              handleUpload
            }
            disabled={loading}
            className="flex-1 bg-yellow-400 text-black py-3 rounded-lg"
          >
            {loading
              ? "Uploading..."
              : "Upload"}
          </button>

        </div>

      </div>

    </div>

  );

}