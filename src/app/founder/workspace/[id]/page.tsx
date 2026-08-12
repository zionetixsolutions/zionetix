import { notFound } from "next/navigation";

import WorkspaceHero from "@/components/workspace/detail/WorkspaceHero";
import WorkspaceStats from "@/components/workspace/detail/WorkspaceStats";
import RecentDocuments from "@/components/workspace/detail/RecentDocuments";
import TeamMembers from "@/components/workspace/detail/TeamMembers";
import NotesSection from "@/components/workspace/detail/NotesSection";
import ActivityPanel from "@/components/workspace/detail/ActivityPanel";
import BrainMapCard from "@/components/workspace/detail/BrainMapCard";
import AIAdvisorCard from "@/components/workspace/detail/AIAdvisorCard";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Workspace {
  id: string;
  venture_id: string;
  workspace_name: string;
  workspace_description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

async function getWorkspace(id: string): Promise<Workspace | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/workspaces/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch workspace");
  }

  const result = await response.json();

  if (!result.success) {
    return null;
  }

  return result.data;
}

export default async function WorkspaceDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const workspace = await getWorkspace(id);

  if (!workspace) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <WorkspaceHero
        workspace={{
          id: workspace.id,
          name: workspace.workspace_name,
          status: "Active",
          description:
            workspace.workspace_description ?? "",
          owner: workspace.created_by ?? "Unknown",
          created: new Date(
            workspace.created_at
          ).toLocaleDateString(),
          updated: new Date(
            workspace.updated_at
          ).toLocaleDateString(),
          documents: 0,
          notes: 0,
          members: 0,
          advisors: 0,
        }}
      />

      <WorkspaceStats
        workspace={{
          id: workspace.id,
          name: workspace.workspace_name,
          status: "Active",
          description:
            workspace.workspace_description ?? "",
          owner: workspace.created_by ?? "Unknown",
          created: new Date(
            workspace.created_at
          ).toLocaleDateString(),
          updated: new Date(
            workspace.updated_at
          ).toLocaleDateString(),
          documents: 0,
          notes: 0,
          members: 0,
          advisors: 0,
        }}
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <RecentDocuments />
        </div>

        <div className="col-span-5">
          <TeamMembers />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-7">
          <NotesSection />
        </div>

        <div className="col-span-5">
          <ActivityPanel />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-4">
          <BrainMapCard />
        </div>

        <div className="col-span-8">
          <AIAdvisorCard />
        </div>
      </div>
    </div>
  );
}