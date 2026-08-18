"use client";

import { useParams, useRouter } from "next/navigation";

import DocumentDetails from "@/components/documents/DocumentDetails";
import type { Document } from "@/types/document";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const documentId = String(params.documentId);

  const document: Document = {
    id: documentId,

    title: "Document",

    description: "",

    type: "Other",

    status: "Draft",

    version: "v1.0",

    owner: {
      id: "founder",
      name: "Founder",
      role: "Owner",
      avatar: "",
    },

    completion: 0,

    wordCount: 0,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),

    lastSaved: new Date().toISOString(),

    sections: [],
  };

  return (
    <DocumentDetails
      document={document}
      onBack={() => router.back()}
    />
  );
}