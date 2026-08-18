"use client";

import { FileText, ChevronRight } from "lucide-react";
import { WorkspaceNote } from "@/types/workspace";

interface Props {
  notes: WorkspaceNote[];
}

export default function NotesSection({
  notes,
}: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <h3 className="font-semibold text-lg">
          Workspace Notes
        </h3>

        <button className="flex items-center gap-2 text-sm">
          View all notes
          <ChevronRight size={16} />
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="p-8 text-center text-sm text-zinc-500">
          No notes found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 p-5">
          {notes.map((note) => (
            <div
              key={note.id}
              className="border border-zinc-200 rounded-2xl p-5"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <FileText
                    size={20}
                    className="text-amber-500"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-zinc-500">
                    {new Date(
                      note.created_at
                    ).toLocaleDateString()}
                  </p>

                  <h4 className="font-semibold mt-2">
                    {note.title}
                  </h4>

                  <p className="text-sm text-zinc-500 mt-2 leading-6">
                    {note.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}