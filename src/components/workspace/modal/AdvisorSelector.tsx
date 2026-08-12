"use client";

const advisors = [
  {
    title: "AI Tech Advisor",
    desc: "System architecture & tech stack",
  },
  {
    title: "AI Market Advisor",
    desc: "Competitor analysis & GTM",
  },
  {
    title: "AI Legal Advisor",
    desc: "Compliance & entity formation",
  },
  {
    title: "AI Finance Advisor",
    desc: "Burn rate & cap table modeling",
  },
];

export default function AdvisorSelector() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {advisors.map((advisor) => (
        <div
          key={advisor.title}
          className="
          border
          border-zinc-200
          rounded-2xl
          p-4
          flex gap-3
          "
        >
          <input
            type="checkbox"
            className="mt-1"
          />

          <div>
            <p className="font-medium text-sm">
              {advisor.title}
            </p>

            <p className="text-xs text-zinc-500 mt-1">
              {advisor.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}