"use client";

import {
  Heading1,
  Bold,
  Italic,
  Underline,
  List,
  ListChecks,
  Quote,
  Table,
  Link2,
} from "lucide-react";

const tools = [
  Heading1,
  Bold,
  Italic,
  Underline,
  List,
  ListChecks,
  Quote,
  Table,
  Link2,
];

export default function EditorToolbar() {
  return (
    <div className="sticky top-0 z-20 mb-6 flex flex-wrap items-center gap-2 rounded-2xl border bg-white/90 p-2 backdrop-blur-xl shadow-sm">
      {tools.map((Icon, index) => (
        <button
          key={index}
          className="
          rounded-xl
          p-2.5
          transition-all
          hover:bg-zinc-100
          hover:scale-105
          active:scale-95
          "
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}