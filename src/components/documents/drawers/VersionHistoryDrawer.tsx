"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Clock3,
    X,
    RotateCcw,
    Eye,
    GitCompare,
} from "lucide-react";

import CompareVersions from "./CompareVersions";
import RestoreVersionModal from "./RestoreVersionModal";

const versions = [
    {
        id: 1,
        version: "v2.4",
        title: "Updated Market Research",
        time: "2 minutes ago",
        current: true,
    },
    {
        id: 2,
        version: "v2.3",
        title: "Added Competitive Analysis",
        time: "Yesterday",
    },
    {
        id: 3,
        version: "v2.2",
        title: "Created Executive Summary",
        time: "3 days ago",
    },
];

interface VersionHistoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function VersionHistoryDrawer({
  open,
  onClose,
}: VersionHistoryDrawerProps) {
    const [restoreOpen, setRestoreOpen] = useState(false);

    return (
        <>
            <AnimatePresence>

                {open && (

                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: .35 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 z-40 bg-black"
                        />

                        <motion.aside
                            initial={{ x: 450 }}
                            animate={{ x: 0 }}
                            exit={{ x: 450 }}
                            transition={{
                                type: "spring",
                                stiffness: 280,
                                damping: 30,
                            }}
                            className="fixed right-0 top-0 z-50 h-screen w-[430px] overflow-y-auto border-l bg-white shadow-2xl"
                        >
                            <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Version History
                                    </h2>

                                    <p className="text-sm text-zinc-500">
                                        Compare & Restore
                                    </p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="rounded-xl p-2 hover:bg-zinc-100"
                                >
                                    <X />
                                </button>
                            </div>

                            <div className="space-y-5 p-6">

                                {versions.map((version) => (

                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        key={version.id}
                                        className={`rounded-2xl border p-5 ${
                                            version.current
                                                ? "border-black bg-zinc-50"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex justify-between">

                                            <span className="font-bold">
                                                {version.version}
                                            </span>

                                            {version.current && (
                                                <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
                                                    Current
                                                </span>
                                            )}

                                        </div>

                                        <h4 className="mt-4 font-semibold">
                                            {version.title}
                                        </h4>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            {version.time}
                                        </p>

                                        <div className="mt-5 flex gap-2">

                                            <button className="flex-1 rounded-xl border py-2 text-sm">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Eye size={16} />
                                                    Preview
                                                </div>
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setRestoreOpen(true)
                                                }
                                                className="flex-1 rounded-xl border py-2 text-sm"
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    <RotateCcw size={16} />
                                                    Restore
                                                </div>
                                            </button>

                                            <button className="rounded-xl border px-3">
                                                <GitCompare size={17} />
                                            </button>

                                        </div>

                                    </motion.div>

                                ))}

                                <CompareVersions
                                    oldVersion="v2.3"
                                    newVersion="v2.4"
                                />

                            </div>

                        </motion.aside>

                    </>

                )}

            </AnimatePresence>

            <RestoreVersionModal
                open={restoreOpen}
                onClose={() => setRestoreOpen(false)}
                onRestore={() => {
                    setRestoreOpen(false);
                }}
            />
        </>
    );
}