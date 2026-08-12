"use client";

interface SeverityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { label: "Severity: All", value: "all" },
  { label: "Info", value: "info" },
  { label: "Warning", value: "warning" },
  { label: "Critical", value: "critical" },
];

export default function SeverityFilter({
  value,
  onChange,
}: SeverityFilterProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-11
          min-w-[170px]
          rounded-xl
          border
          border-zinc-200
          bg-white
          px-4
          pr-10
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-zinc-700
          outline-none
          transition-all
          duration-200
          appearance-none
          cursor-pointer
          hover:border-zinc-300
          focus:border-black
          focus:ring-4
          focus:ring-black/5
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <svg
        className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-zinc-500
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}