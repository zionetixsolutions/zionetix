"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import GlassCard from "./GlassCard";

type Decision = {
  id: string;
  category: string;
  title: string;
  status: string;
  confidence_score: number;
  created_at: string;
};

export default function DecisionInbox() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        const response = await fetch("/api/dashboard/decisions");

        const result = await response.json();

        if (result.success) {
          setDecisions(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch decisions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecisions();
  }, []);

  return (
    <GlassCard>
      <div className="p-6">
        <h2 className="font-semibold mb-5">
          Decision Inbox
        </h2>

        {loading ? (
          <p className="text-sm text-zinc-400">
            Loading decisions...
          </p>
        ) : decisions.length === 0 ? (
          <p className="text-sm text-zinc-400">
            No pending decisions.
          </p>
        ) : (
          <div className="space-y-4">
            {decisions.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  items-center
                  justify-between
                  border
                  border-zinc-200
                  rounded-2xl
                  p-5
                  hover:shadow-md
                  hover:border-black
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <div>
                  <p className="text-xs text-zinc-400">
                    {item.category}
                  </p>

                  <p className="font-medium mt-1">
                    {item.title}
                  </p>
                </div>

                <ChevronRight size={18} />
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}