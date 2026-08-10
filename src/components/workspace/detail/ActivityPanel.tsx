"use client";

import {
  FileText,
  FileEdit,
  Settings,
  ChevronRight,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "You uploaded Product_Roadmap.pdf",
    time: "Today, 10:30 AM",
    icon: FileText,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    id: 2,
    title: "Sarah Williams created a new note",
    time: "Today, 09:20 AM",
    icon: FileEdit,
    bg: "bg-yellow-50",
    color: "text-yellow-600",
  },
  {
    id: 3,
    title: "Alex Johnson updated workspace settings",
    time: "Yesterday, 04:45 PM",
    icon: Settings,
    bg: "bg-green-50",
    color: "text-green-600",
  },
];

export default function ActivityPanel() {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b">
        <h3 className="font-semibold text-lg">
          Recent Activity
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex gap-4"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg}`}
              >
                <Icon
                  size={18}
                  className={item.color}
                />
              </div>

              <div>
                <p className="font-medium">
                  {item.title}
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-6 pb-5">
        <button className="flex items-center gap-2 text-sm font-medium">
          View all activity
          <ChevronRight size={16}/>
        </button>
      </div>
    </div>
  );
}