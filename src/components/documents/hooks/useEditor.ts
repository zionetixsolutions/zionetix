"use client";

import { useState } from "react";

export default function useEditor() {
  const [content, setContent] =
    useState("");

  const updateContent = (
    value: string
  ) => {
    setContent(value);
  };

  const saveDocument = () => {
    console.log("Document Saved");
  };

  return {
    content,
    updateContent,
    saveDocument,
  };
}