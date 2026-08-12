"use client";

import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

interface Venture {
  ventureName: string;
  ventureId: string;
  createdAt: string;
  teamSize: number;
}

export default function VentureOverview() {
  const [venture, setVenture] =
    useState<Venture | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchVenture = async () => {
      try {
        const response = await fetch(
          "/api/dashboard/venture"
        );

        const data = await response.json();

        console.log(
          "VENTURE OVERVIEW:",
          data
        );

        if (data.success) {
          setVenture(data.venture);
        }
      } catch (error) {
        console.error(
          "Failed to fetch venture:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVenture();
  }, []);

  return (
    <GlassCard>
      <div className="p-6">

        <h2
          className="
            text-lg
            font-semibold
            text-zinc-900
            mb-6
          "
        >
          Venture Overview
        </h2>

        <div className="grid grid-cols-2 gap-y-6">

          {/* Venture Name */}
          <div>
            <p className="text-zinc-400 text-sm">
              Venture Name
            </p>

            <p className="font-medium mt-1">
              {loading
                ? "Loading..."
                : venture?.ventureName || "-"}
            </p>
          </div>

          {/* Team Size */}
          <div>
            <p className="text-zinc-400 text-sm">
              Team Size
            </p>

            <p className="font-medium mt-1">
              {loading
                ? "Loading..."
                : `${venture?.teamSize || 0} Members`}
            </p>
          </div>

          {/* Venture ID */}
          <div>
            <p className="text-zinc-400 text-sm">
              Venture ID
            </p>

            <p className="font-medium mt-1">
              {loading
                ? "Loading..."
                : venture?.ventureId || "-"}
            </p>
          </div>

          {/* Created Date */}
          <div>
            <p className="text-zinc-400 text-sm">
              Created Date
            </p>

            <p className="font-medium mt-1">
              {loading
                ? "Loading..."
                : venture?.createdAt
                ? new Date(
                    venture.createdAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "-"}
            </p>
          </div>

          {/* Current Stage */}
          <div>
            <p className="text-zinc-400 text-sm">
              Current Stage
            </p>

            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-green-100
                px-4
                py-1
                text-xs
                font-semibold
                text-green-700
              "
            >
              Idea Stage
            </span>
          </div>

        </div>
      </div>
    </GlassCard>
  );
}