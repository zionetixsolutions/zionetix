"use client";

interface PaginationProps {
  total: number;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  total,
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t px-6 py-4">
      <p className="text-sm text-zinc-500">
        Showing {total} logs
      </p>

      <div className="flex items-center gap-2">
        <button
          className="rounded border px-3 py-2 text-sm disabled:opacity-40"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-sm">
          {currentPage} / {totalPages}
        </span>

        <button
          className="rounded border px-3 py-2 text-sm disabled:opacity-40"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}