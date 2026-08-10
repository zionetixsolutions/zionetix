"use client";

interface WorkspaceFile {
  id: string;
  file_name: string;
}

interface DeleteFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  file: WorkspaceFile | null;
}

export default function DeleteFileModal({
  isOpen,
  onClose,
  onSuccess,
  file,
}: DeleteFileModalProps) {

  if (!isOpen || !file)
    return null;

  async function handleDelete() {

  if (!file) return;

  try {

    const response =
      await fetch(
        `/api/workspace/files?fileId=${file.id}`,
        {
          method: "DELETE",
        }
      );

    const data =
      await response.json();

    if (data.success) {

      onSuccess();
      onClose();

    }

  } catch (error) {

    console.error(error);

  }

}

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold text-white mb-4">
          Delete File
        </h2>

        <p className="text-zinc-400 mb-6">

          Are you sure you want to delete

          <span className="text-white font-semibold">
            {" "}
            {file.file_name}
          </span>

          ?

        </p>

        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 bg-zinc-700 text-white py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}