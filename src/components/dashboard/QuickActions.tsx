import GlassCard from "./GlassCard";
import {
  PlusCircle,
  Upload,
  Share2,
  UserPlus,
} from "lucide-react";

const actions = [
  {
    label: "Create Workspace",
    icon: PlusCircle,
  },
  {
    label: "Upload Document",
    icon: Upload,
  },
  {
    label: "Brain Map",
    icon: Share2,
  },
  {
    label: "Invite Member",
    icon: UserPlus,
  },
];

export default function QuickActions() {
  return (
    <GlassCard>
     <div className="p-6">
      <h2 className="font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className="
border
border-zinc-200
rounded-2xl
px-5
py-5
flex
items-center
gap-3
hover:bg-white
hover:shadow-lg
hover:-translate-y-1
transition-all
duration-300
"
            >
              <Icon size={18} />

              {action.label}
            </button>
          );
        })}
      </div>
    </div>
    </GlassCard>
  );
}