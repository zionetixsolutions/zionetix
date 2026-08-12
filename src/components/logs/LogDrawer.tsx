"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Copy } from "lucide-react";
import MetadataAccordion from "./MetadataAccordion";
import type { Log } from "@/types/log";

interface Props {
  open: boolean;
  log: Log | null;
  onClose: () => void;
}

export default function LogDrawer({
  open,
  log,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && log && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black"
          />

          {/* Drawer */}

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed
              right-0
              top-0
              z-50
              flex
              h-screen
              w-[520px]
              max-w-full
              flex-col
              border-l
              bg-white
              shadow-2xl
            "
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  Log Details
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Complete activity information
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-zinc-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

              {/* Event */}

              <section className="space-y-4">

                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Event Information
                </h3>

                <div className="grid grid-cols-2 gap-5">

                  <Info
                    label="Log ID"
                    value={log.id}
                  />

                  <Info
                    label="Timestamp"
                    value={`${log.date} • ${log.time}`}
                  />

                  <Info
                    label="Module"
                    value={log.module}
                  />

                  <Info
                    label="Severity"
                    value={log.severity}
                  />

                  <Info
                    label="Status"
                    value={log.status}
                  />

                  <Info
                    label="Action"
                    value={log.action}
                  />

                </div>

              </section>

              {/* User */}

              <section className="space-y-4">

  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
    User Information
  </h3>

  <div className="flex items-center gap-4 rounded-xl border p-4">

    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-black text-white font-bold">

      {log.user.avatar ? (
        <img
          src={log.user.avatar}
          alt={log.user.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>
          {log.user.name.charAt(0)}
        </span>
      )}

    </div>

    <div className="min-w-0">

      <h4 className="truncate font-semibold">
        {log.user.name}
      </h4>

      <p className="truncate text-sm text-zinc-500">
        {log.user.role}
      </p>

      <p className="truncate text-xs text-zinc-400">
        {log.user.email}
      </p>

    </div>

  </div>

</section>

              {/* Description */}

              <section className="space-y-4">

                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Description
                </h3>

                <div className="rounded-xl border p-4 text-sm leading-7">
                  {log.action}
                </div>

              </section>

              {/* Resource */}

              <section className="space-y-4">

                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Resource
                </h3>

                <div className="rounded-xl border">

                  <Row
                    label="Module"
                    value={log.module}
                  />

                  <Row
                    label="Resource"
                    value="Workspace Resource"
                  />

                  <Row
                    label="Workspace"
                    value="Primordial"
                    last
                  />

                </div>

              </section>

              {/* System */}

              <section className="space-y-4">

                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  System Information
                </h3>

                <div className="grid grid-cols-2 gap-5">

                  <Info
                    label="IP Address"
                    value="192.168.1.10"
                  />

                  <Info
                    label="Browser"
                    value="Chrome"
                  />

                  <Info
                    label="OS"
                    value="Windows 11"
                  />

                  <Info
                    label="Device"
                    value="Desktop"
                  />

                </div>

              </section>

              {/* Metadata */}

              <MetadataAccordion metadata={log.metadata}/>

            </div>

            {/* Footer */}

            <div className="flex gap-3 border-t p-5">

              <button
                onClick={onClose}
                className="
                  flex-1
                  rounded-xl
                  border
                  py-3
                  font-medium
                  hover:bg-zinc-100
                "
              >
                Close
              </button>

              <button
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-black
                  py-3
                  text-white
                  hover:bg-zinc-800
                "
              >
                <Copy size={16} />

                Copy Log ID
              </button>

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        !last && "border-b"
      }`}
    >
      <span className="text-sm text-zinc-500">
        {label}
      </span>

      <span className="text-sm font-medium">
        {value}
      </span>
    </div>
  );
}