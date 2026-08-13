"use client";

import { useState } from "react";
import { Document } from "@/types/document";

const initialDocument: Document = {
  id: "DOC-001",

  title: "Market Analysis",

  description:
    "Competitive landscape, target personas and market sizing for Q4 2026.",

  type: "Market Analysis",

  status: "In Progress",

  version: "v2.4.0",

  owner: {
    id: "USR-001",
    name: "John Founder",
    role: "Chief Executive",
    avatar: "/avatars/founder.png",
  },

  completion: 65,

  wordCount: 1240,

  createdAt: "Oct 12, 2026",

  updatedAt: "2 minutes ago",

  lastSaved: "Saved 2 minutes ago",

  sections: [
    {
      id: "1",
      title: "Executive Summary",
      expanded: true,
      content:
        "The Q4 Market Analysis outlines the strategic positioning of Primordial within the venture ecosystem.",
    },
    {
      id: "2",
      title: "Problem Statement",
      expanded: true,
      content:
        "Current venture operating systems lack AI-first decision intelligence.",
    },
    {
      id: "3",
      title: "Vision & Strategy",
      expanded: true,
      content:
        "Build the operating system for founders using AI-driven workflows.",
    },
  ],
};

export default function useDocument() {
  const [document, setDocument] =
    useState<Document>(initialDocument);

  const updateDocument = (
    updated: Partial<Document>
  ) => {
    setDocument((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return {
    document,
    updateDocument,
  };
}