"use client";

import {
  AlertTriangle,
  Brain,
  CalendarDays,
  History,
} from "lucide-react";

import type { Log } from "@/types/log";

interface LogsStatsProps {
  logs: Log[];
}

export default function LogsStats({
  logs,
}: LogsStatsProps) {
  const totalEvents = logs.length;

  const todaysEvents = logs.filter(
    (log) => log.date === "Today"
  ).length;

  const criticalEvents = logs.filter(
    (log) => log.severity === "Critical"
  ).length;

  const aiEvents = logs.filter(
    (log) =>
      log.module === "AI" ||
      log.user.role === "AI"
  ).length;

  const cards = [
    {
      title: "Total Events",
      value: totalEvents.toLocaleString(),
      subtitle: "+2.4%",
      icon: History,
      accent: false,
    },
    {
      title: "Today's Events",
      value: todaysEvents.toString(),
      subtitle: "",
      icon: CalendarDays,
      accent: false,
    },
    {
      title: "Critical Events",
      value: criticalEvents.toString(),
      subtitle: "",
      icon: AlertTriangle,
      accent: true,
    },
    {
      title: "AI Actions",
      value: aiEvents.toString(),
      subtitle: "",
      icon: Brain,
      accent: false,
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              group
              rounded-2xl
              border
              bg-zinc-50
              p-7
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
              ${
                card.accent
                  ? "border-l-4 border-l-red-500"
                  : "border-zinc-200"
              }
            `}
          >
            <div className="mb-8 flex items-start justify-between">
              <Icon
                size={24}
                className={`
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  ${
                    card.accent
                      ? "text-red-500"
                      : "text-zinc-500"
                  }
                `}
              />

              <span className="font-mono text-xs text-zinc-400">
                {String(
                  cards.indexOf(card) + 1
                ).padStart(2, "0")}
              </span>
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              {card.title}
            </p>

            <div className="flex items-end gap-2">
              <h2
                className={`text-4xl font-bold ${
                  card.accent
                    ? "text-red-600"
                    : "text-black"
                }`}
              >
                {card.value}
              </h2>

              {card.subtitle && (
                <span className="pb-1 text-xs font-bold text-green-600">
                  {card.subtitle}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}