"use client";

import { FileText, ChevronRight } from "lucide-react";

const notes = [
  {
    id: 1,
    date: "May 16, 2026",
    title: "MVP Scope Definition",
    desc: "Defining the core MVP features and user stories for the initial launch...",
  },
  {
    id: 2,
    date: "May 15, 2026",
    title: "Technical Architecture",
    desc: "High level architecture and tech stack selection for the product...",
  },
];

export default function NotesSection() {
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

      <div className="grid grid-cols-2 gap-5 p-5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border border-zinc-200 rounded-2xl p-5"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <FileText
                  size={20}
                  className="text-amber-500"
                />
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  {note.date}
                </p>

                <h4 className="font-semibold mt-2">
                  {note.title}
                </h4>

                <p className="text-sm text-zinc-500 mt-2 leading-6">
                  {note.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}