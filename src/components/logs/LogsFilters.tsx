interface LogsFiltersProps {
  active: string;
  onChange: (value: string) => void;
}

const filters = [
  "All Events",
  "Authentication",
  "Workspace",
  "Security",
  "Billing",
];

export default function LogsFilters({
  active,
  onChange,
}: LogsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              active === item
                ? "bg-black text-white"
                : "border border-zinc-300 bg-white hover:bg-zinc-100"
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}