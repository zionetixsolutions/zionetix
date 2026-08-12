"use client";
import {
  Pencil,
  Trash2,
} from "lucide-react";

import EditNoteModal from "@/components/workspace/EditNoteModal";

import DeleteNoteModal from "@/components/workspace/DeleteNoteModal";
import CreateNoteModal from "@/components/workspace/CreateNoteModal";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useCallback } from "react";
interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [
  isEditModalOpen,
  setIsEditModalOpen,
] = useState(false);

const [
  isDeleteModalOpen,
  setIsDeleteModalOpen,
] = useState(false);

const [
  selectedNote,
  setSelectedNote,
] = useState<Note | null>(null);
const [isCreateModalOpen,setIsCreateModalOpen,]= useState(false);
  const params = useParams();

  const workspaceId =
    params.workspaceId as string;

  const [notes, setNotes] =
    useState<Note[]>([]);

  const [loading, setLoading] =
  useState(true);

const fetchNotes = useCallback(async () => {

  try {

    const response =
      await fetch(
        `/api/workspace/notes?workspaceId=${workspaceId}`
      );

    const data =
      await response.json();

    if (data.success) {

      setNotes(data.notes);

    }

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

},[workspaceId]);

useEffect(() => {

  if (!workspaceId)
    return;

  const timer =
    setTimeout(() => {

      fetchNotes();

    }, 0);

  return () =>
    clearTimeout(timer);

}, [workspaceId, fetchNotes]);

  return (
    <>
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Workspace Notes
          </h1>

          <p className="text-zinc-400">
            Notes Management
          </p>

        </div>

        <button
          className="bg-yellow-400 text-black px-5 py-3 rounded-lg flex items-center gap-2"
          onClick={() => setIsCreateModalOpen(true)} >
          <Plus size={18} />
          Create Note
        </button>
        
      </div>

      {loading ? (

        <p className="text-zinc-400">
          Loading...
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {notes.map((note) => (

            <div
              key={note.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >

              <h2 className="text-xl font-semibold text-white mb-2">
                {note.title}
              </h2>

              <p className="text-zinc-400">
                {note.content}
              </p>
              <div className="flex justify-end gap-3 mt-5">

  <button
    onClick={() => {

      setSelectedNote(note);
      setIsEditModalOpen(true);

    }}
  >
    <Pencil
      size={18}
      className="text-blue-400"
    />
  </button>

  <button
    onClick={() => {

      setSelectedNote(note);
      setIsDeleteModalOpen(true);

    }}
  >
    <Trash2
      size={18}
      className="text-red-400"
    />
  </button>

</div>


            </div>

          ))}

        </div>

      )}

    </div>
    <CreateNoteModal
  isOpen={
    isCreateModalOpen
  }
  onClose={() =>
    setIsCreateModalOpen(false)
  }
  onSuccess={() =>
    fetchNotes()
  }
  workspaceId={
    workspaceId
  }
/>
<EditNoteModal
  isOpen={
    isEditModalOpen
  }
  onClose={() =>
    setIsEditModalOpen(false)
  }
  onSuccess={() =>
    fetchNotes()
  }
  note={selectedNote}
/>

<DeleteNoteModal
  isOpen={
    isDeleteModalOpen
  }
  onClose={() =>
    setIsDeleteModalOpen(false)
  }
  onSuccess={() =>
    fetchNotes()
  }
  note={selectedNote}
/>
</>
  );

}