import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  TrendingUp,
  Landmark,
  Scale,
  MessageSquare,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const advisors = [
  {
    id: 1,
    title: "AI Tech Advisor",
    description:
      "Provides technical guidance for product architecture, development and engineering decisions.",
    activity: "2h ago",
    icon: Code2,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "AI Market Advisor",
    description:
      "Analyzes market opportunities, competitors, positioning and growth strategies.",
    activity: "5h ago",
    icon: TrendingUp,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: 3,
    title: "AI Finance Advisor",
    description:
      "Helps with financial planning, projections, budgeting and investment decisions.",
    activity: "1d ago",
    icon: Landmark,
    color: "bg-green-50 text-green-600",
  },
  {
    id: 4,
    title: "AI Legal Advisor",
    description:
      "Provides guidance around legal considerations, contracts and compliance.",
    activity: "3d ago",
    icon: Scale,
    color: "bg-purple-50 text-purple-600",
  },
];

export default async function WorkspaceAdvisorsPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">

      {/* HEADER */}

      <div>
        <Link
          href={`/founder/workspace/${id}`}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-zinc-500
            hover:text-black
            mb-5
          "
        >
          <ArrowLeft size={16} />
          Back to Workspace
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              AI Advisors
            </h1>

            <p className="mt-2 text-zinc-500">
              AI advisors available in this workspace
            </p>
          </div>

          <div className="text-sm text-zinc-500">
            {advisors.length} advisors
          </div>
        </div>
      </div>

      {/* ADVISORS */}

      <div className="grid grid-cols-2 gap-6">
        {advisors.map((advisor) => {
          const Icon = advisor.icon;

          return (
            <div
              key={advisor.id}
              className="
                bg-white
                border
                border-zinc-200
                rounded-3xl
                p-6
                hover:border-zinc-300
                hover:shadow-sm
                transition
              "
            >
              <div className="flex items-start justify-between">
                <div
                  className={`
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${advisor.color}
                  `}
                >
                  <Icon size={26} />
                </div>

                <button
                  type="button"
                  className="
                    w-10
                    h-10
                    border
                    border-zinc-200
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    hover:bg-zinc-50
                  "
                >
                  <MessageSquare size={16} />
                </button>
              </div>

              <h2 className="text-xl font-semibold mt-6">
                {advisor.title}
              </h2>

              <p className="text-sm text-zinc-500 mt-3 leading-6">
                {advisor.description}
              </p>

              <div className="flex items-center justify-between mt-6 pt-5 border-t">
                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-xs
                    font-medium
                  "
                >
                  ACTIVE
                </span>

                <span className="text-xs text-zinc-400">
                  Last activity: {advisor.activity}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}