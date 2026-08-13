"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  FileText,
  FileCode,
  FileJson,
  Globe,
  Printer,
  CheckCircle2,
} from "lucide-react";

interface ExportDocumentModalProps {
  open: boolean;
  onClose: () => void;
}

type ExportType =
  | "PDF"
  | "DOCX"
  | "Markdown"
  | "HTML"
  | "JSON"
  | "Print";

export default function ExportDocumentModal({
  open,
  onClose,
}: ExportDocumentModalProps) {
  const [selected, setSelected] =
    useState<ExportType>("PDF");

  const [exporting, setExporting] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [onClose]);

  const options = [
    {
      name: "PDF",
      icon: FileText,
      description: "Portable Document Format",
    },
    {
      name: "DOCX",
      icon: FileText,
      description: "Microsoft Word Document",
    },
    {
      name: "Markdown",
      icon: FileCode,
      description: "Developer Friendly",
    },
    {
      name: "HTML",
      icon: Globe,
      description: "Web Page",
    },
    {
      name: "JSON",
      icon: FileJson,
      description: "Raw Structured Data",
    },
    {
      name: "Print",
      icon: Printer,
      description: "Print Document",
    },
  ] as const;

  const handleExport = () => {
    setExporting(true);

    setTimeout(() => {
      setExporting(false);
      setCompleted(true);

      setTimeout(() => {
        setCompleted(false);
        onClose();
      }, 1200);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl">

              {/* Header */}

              <div className="flex items-center justify-between border-b px-7 py-5">

                <div>

                  <h2 className="text-xl font-semibold">
                    Export Document
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Choose a format for exporting this document.
                  </p>

                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl p-2 hover:bg-zinc-100"
                >
                  <X size={20} />
                </button>

              </div>

              {/* Formats */}

              <div className="grid grid-cols-2 gap-4 p-7">

                {options.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() =>
                        setSelected(item.name)
                      }
                      className={`rounded-2xl border p-5 text-left transition-all ${
                        selected === item.name
                          ? "border-black bg-zinc-100"
                          : "hover:bg-zinc-50"
                      }`}
                    >
                      <Icon
                        size={26}
                        className="mb-4"
                      />

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Progress */}

              {exporting && (
                <div className="px-7 pb-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 1.8,
                      }}
                      className="h-full bg-black"
                    />
                  </div>

                  <p className="mt-2 text-sm text-zinc-500">
                    Preparing export...
                  </p>
                </div>
              )}

              {completed && (
                <div className="flex items-center gap-3 px-7 pb-4 text-green-600">
                  <CheckCircle2 size={22} />
                  <span className="font-medium">
                    Export completed successfully.
                  </span>
                </div>
              )}

              {/* Footer */}

              <div className="flex justify-end gap-3 border-t px-7 py-5">

                <button
                  onClick={onClose}
                  className="rounded-xl border px-5 py-2.5"
                >
                  Cancel
                </button>

                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="rounded-xl bg-black px-6 py-2.5 text-white disabled:opacity-60"
                >
                  {exporting
                    ? "Exporting..."
                    : `Export ${selected}`}
                </button>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}