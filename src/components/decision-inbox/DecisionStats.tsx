"use client";

import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    icon: ClipboardList,
    number: "14",
    title: "Pending Decisions",
    extra: "+2 Today",
  },
  {
    icon: CheckCircle2,
    number: "128",
    title: "Approved",
  },
  {
    icon: XCircle,
    number: "09",
    title: "Rejected",
  },
  {
    icon: AlertTriangle,
    number: "05",
    title: "Needs Review",
    extra: "Urgent",
  },
];

export default function DecisionStats() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
            bg-white
            border
            rounded-[28px]
            p-8
            h-[190px]
            "
          >
            <div className="flex justify-between">
              <Icon size={26} />
              <span className="text-xl">
                0{index + 1}
              </span>
            </div>

            <div className="mt-12">
              <p className="uppercase text-zinc-500">
                {item.title}
              </p>

              <div className="flex items-center gap-4 mt-3">
                <span className="text-4xl font-semibold">
                  {item.number}
                </span>

                {item.extra && (
                  <span className="text-emerald-600 font-medium">
                    {item.extra}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}