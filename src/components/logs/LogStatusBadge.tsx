"use client";

interface LogStatusBadgeProps {
  status: "Success" | "Pending" | "Failed";
}

const styles = {
  Success:
    "text-green-600 bg-green-50 border-green-200",

  Pending:
    "text-amber-600 bg-amber-50 border-amber-200",

  Failed:
    "text-red-600 bg-red-50 border-red-200",
};

export default function LogStatusBadge({
  status,
}: LogStatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-2.5
        py-1
        text-[11px]
        font-semibold
        uppercase
        tracking-wider
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}