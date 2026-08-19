"use client";

import Link from "next/link";
import {
  Code2,
  TrendingUp,
  Landmark,
  Scale,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const advisors = [
  {
    id: 1,
    title: "AI Tech Advisor",
    activity: "2h ago",
    icon: Code2,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "AI Market Advisor",
    activity: "5h ago",
    icon: TrendingUp,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: 3,
    title: "AI Finance Advisor",
    activity: "1d ago",
    icon: Landmark,
    color: "bg-green-50 text-green-600",
  },
  {
    id: 4,
    title: "AI Legal Advisor",
    activity: "3d ago",
    icon: Scale,
    color: "bg-purple-50 text-purple-600",
  },
];

interface Props {
  workspaceId: string;
}

export default function AIAdvisorCard({
  workspaceId,
}: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">
          AI Advisors
        </h3>

        <Link
          href={`/founder/workspace/${workspaceId}/advisors`}
          className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black transition"
        >
          View all advisors
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {advisors.map((advisor) => {
          const Icon = advisor.icon;

          return (
            <div
              key={advisor.id}
              className="
                border
                border-zinc-200
                rounded-xl
                p-4
                hover:shadow-md
                transition-all
              "
            >
              <div className="flex justify-between">
                <div
                  className={`
                    w-12
                    h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${advisor.color}
                  `}
                >
                  <Icon size={22} />
                </div>

                <button
                  type="button"
                  className="
                    w-8
                    h-8
                    border
                    rounded-lg
                    flex
                    items-center
                    justify-center
                  "
                >
                  <MessageSquare size={14} />
                </button>
              </div>

              <h4 className="font-medium mt-4">
                {advisor.title}
              </h4>

              <span
                className="
                  inline-block
                  mt-2
                  px-2
                  py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                  text-[11px]
                  font-medium
                "
              >
                ACTIVE
              </span>

              <p className="text-xs text-zinc-500 mt-2">
                Last activity: {advisor.activity}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}