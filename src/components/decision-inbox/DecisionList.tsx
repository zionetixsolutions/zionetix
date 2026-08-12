"use client";

import { decisions } from "@/data/decisions";
import DecisionCard from "./DecisionCard";

export default function DecisionList() {
  return (
    <div className="space-y-6">

      {decisions.map((decision) => (
        <DecisionCard
          key={decision.id}
          decision={decision}
        />
      ))}

    </div>
  );
}