"use client";

import { motion } from "framer-motion";
import DocumentCard from "../cards/DocumentCard";
import { documents } from "@/data/documents";
import type { Document } from "@/types/document";

interface DocumentsGridProps {
    onOpenDocument: (document: Document) => void;
}

export default function DocumentsGrid({
    onOpenDocument,
}: DocumentsGridProps) {

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.08,
                    },
                },
            }}
            className="grid grid-cols-2 gap-6"
        >
            {documents.map((doc) => (

                <motion.div
                    key={doc.id}
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 20,
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                        },
                    }}
                >

                    <DocumentCard
                        document={doc}
                        onOpen={onOpenDocument}
                    />

                </motion.div>

            ))}
        </motion.div>
    );
}