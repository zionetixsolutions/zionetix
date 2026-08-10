"use client";

import { modules } from "@/data/modules";

interface Props {
  selected: string[];
  onChange: (id: string) => void;
}

export default function ModuleSelector({
  selected,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">
      {modules.map((module) => (
        <label
          key={module.id}
          className="
          flex items-center gap-3
          cursor-pointer
          "
        >
          <input
            type="checkbox"
            checked={selected.includes(module.id)}
            onChange={() =>
              onChange(module.id)
            }
          />

          <span>{module.title}</span>
        </label>
      ))}
    </div>
  );
}