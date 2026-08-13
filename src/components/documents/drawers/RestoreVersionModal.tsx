"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
    open: boolean;
    onClose: () => void;
    onRestore: () => void;
}

export default function RestoreVersionModal({
    open,
    onClose,
    onRestore,
}: Props) {
    return (
        <AnimatePresence>

            {open && (

                <>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: .45 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: .9,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: .9,
                        }}
                        className="fixed left-1/2 top-1/2 z-[60] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold">
                            Restore Version?
                        </h2>

                        <p className="mt-3 text-sm text-zinc-500">
                            Restoring creates a brand-new version while
                            preserving the current document history.
                        </p>

                        <div className="mt-8 flex gap-3">

                            <button
                                onClick={onClose}
                                className="flex-1 rounded-xl border py-3"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onRestore}
                                className="flex-1 rounded-xl bg-black py-3 text-white"
                            >
                                Restore
                            </button>

                        </div>

                    </motion.div>

                </>

            )}

        </AnimatePresence>
    );
}