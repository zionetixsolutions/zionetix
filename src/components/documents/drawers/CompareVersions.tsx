"use client";

import { motion } from "framer-motion";
import {
    GitCompare,
    FileText,
    Clock,
} from "lucide-react";

interface CompareVersionsProps {
    oldVersion: string;
    newVersion: string;
}

export default function CompareVersions({
    oldVersion,
    newVersion,
}: CompareVersionsProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-zinc-200 bg-white p-5"
        >
            <div className="flex items-center gap-2 mb-5">
                <GitCompare
                    size={18}
                    className="text-blue-600"
                />
                <h3 className="font-semibold">
                    Compare Versions
                </h3>
            </div>

            <div className="space-y-4">

                <div className="rounded-xl bg-zinc-50 p-4">

                    <div className="flex justify-between">

                        <span className="flex items-center gap-2">
                            <FileText size={16} />
                            {oldVersion}
                        </span>

                        <span className="text-zinc-400">
                            Previous
                        </span>

                    </div>

                </div>

                <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">

                    <div className="flex justify-between">

                        <span className="flex items-center gap-2">
                            <Clock size={16} />
                            {newVersion}
                        </span>

                        <span className="text-blue-600">
                            Current
                        </span>

                    </div>

                </div>

                <button className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:opacity-90">
                    Open Comparison
                </button>

            </div>
        </motion.div>
    );
}