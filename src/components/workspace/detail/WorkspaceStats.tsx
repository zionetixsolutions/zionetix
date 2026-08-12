import { WorkspaceDetail } from "@/types/workspace";

interface Props {
  workspace: WorkspaceDetail;
}
import {
  FileText,
  NotebookPen,
  Users,
  Bot,
} from "lucide-react";


export default function WorkspaceStats({
  workspace,
}: Props) {
  const stats = [
    {
      label: "Documents",
      value: workspace.documents,
      icon: FileText,
    },
    {
      label: "Notes",
      value: workspace.notes,
      icon: NotebookPen,
    },
    {
      label: "Team Members",
      value: workspace.members,
      icon: Users,
    },
    {
      label: "AI Advisors",
      value: workspace.advisors,
      icon: Bot,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="
            bg-white
            rounded-2xl
            border
            p-6
            "
          >
            <Icon size={28} />

            <h2
              className="
              text-4xl
              font-bold
              mt-5
              "
            >
              {item.value}
            </h2>

            <p
              className="
              text-zinc-500
              mt-2
              "
            >
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}