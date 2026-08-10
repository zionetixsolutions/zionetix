import { ChevronRight } from "lucide-react";
import GlassCard from "./GlassCard";
const decisions = [
  {
    category: "Finance",
    title: "Approve Pricing Structure",
  },
  {
    category: "Legal",
    title: "Review Partnership Agreement",
  },
  {
    category: "Product",
    title: "Finalize Q3 Roadmap",
  },
];

export default function DecisionInbox() {
  return (
    <GlassCard>
    <div className="p-6">
      <h2 className="font-semibold mb-5">
        Decision Inbox
      </h2>

      <div className="space-y-4">
        {decisions.map((item) => (
          <div
            key={item.title}
            className="
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
    </div>
    </GlassCard>
  );
}