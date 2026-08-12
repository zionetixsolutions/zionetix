import WorkspaceCard from "./WorkspaceCard";
import { workspaces } from "@/data/workspaceData";

export default function WorkspaceGrid() {
  return (
    <div
      className="
      grid
      grid-cols-3
      gap-6
      "
    >
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          workspace={workspace}
        />
      ))}
    </div>
  );
}