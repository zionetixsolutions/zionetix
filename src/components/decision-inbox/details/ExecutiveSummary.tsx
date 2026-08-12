"use client";

import { motion } from "framer-motion";

export default function ExecutiveSummary() {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl border border-zinc-200 p-10 shadow-sm"
    >
      <h3 className="text-xl font-semibold mb-6">
        Executive Summary
      </h3>

      <p className="leading-8 text-zinc-600">
        This strategy outlines the proposed timeline and
        resource allocation for the Series A expansion into
        European markets. The plan focuses on establishing
        regional hubs in London and Berlin to facilitate
        localized sales operations and technical support,
        aiming for a 3x increase in enterprise customer
        acquisition over the next 18 months.
      </p>
    </motion.section>
  );
}