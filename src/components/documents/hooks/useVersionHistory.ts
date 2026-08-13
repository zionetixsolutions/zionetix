"use client";

import { useState } from "react";

export default function useVersionHistory() {
  const [isOpen, setIsOpen] =
    useState(false);

  const openHistory = () => {
    setIsOpen(true);
  };

  const closeHistory = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openHistory,
    closeHistory,
  };
}