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

interface ApiWorkspace {
  id: string;
  venture_id: string;
  workspace_name: string;
  workspace_description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

async function getWorkspace(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/workspaces/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    return null;
  }

  return result.data as ApiWorkspace;
}

export default async function WorkspaceDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const workspace = await getWorkspace(id);

  if (!workspace) {
    notFound();
  }

  /*
   * API data ni existing UI structure ki map chestunnam.
   *
   * Documents / notes / members / advisors
   * ippudu DB lo separate tables connect cheyyaledu kabatti
   * temporary ga 0.
   */
  const workspaceDetail = {
    id: workspace.id,
    name: workspace.workspace_name,
    status: "Active",
    description:
      workspace.workspace_description || "",
    owner: workspace.created_by || "Founder",
    created: new Date(
      workspace.created_at
    ).toLocaleDateString(),
    updated: new Date(
      workspace.updated_at
    ).toLocaleString(),

    documents: 0,
    notes: 0,
    members: 0,
    advisors: 0,
  };

  return (
    <div className="space-y-8">
      <WorkspaceHero
        workspace={workspaceDetail}
      />

      <WorkspaceStats
        workspace={workspaceDetail}
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <RecentDocuments />
        </div>

        <div className="col-span-5">
          <TeamMembers />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <NotesSection />
        </div>

        <div className="col-span-5">
          <ActivityPanel />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
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