"use client";

import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";

interface MetadataAccordionProps {
  metadata: Record<string, unknown>;
}

export default function MetadataAccordion({
  metadata,
}: MetadataAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formattedJson = JSON.stringify(metadata, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy metadata:", err);
    }
  };

  return (
    <section className="space-y-4">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Additional Metadata
        </h3>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">

          <div className="relative rounded-2xl bg-zinc-950">

            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 rounded-lg bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              {copied ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}
            </button>

            <pre className="overflow-x-auto p-5 text-xs leading-6 text-green-400">
              <code>{formattedJson}</code>
            </pre>

          </div>

        </div>
      </div>

    </section>
  );
}