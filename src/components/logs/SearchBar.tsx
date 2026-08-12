"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search logs...",
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-zinc-200
          bg-zinc-50
          pl-11
          pr-4
          text-sm
          text-zinc-900
          placeholder:text-zinc-400
          outline-none
          transition-all
          duration-200
          focus:border-black
          focus:bg-white
          focus:ring-4
          focus:ring-black/5
        "
      />
    </div>
  );
}