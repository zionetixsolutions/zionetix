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

/* =========================================================
   API TYPES
========================================================= */

interface ApiWorkspace {
  id: string;
  venture_id: string;
  workspace_name: string;
  workspace_description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

interface WorkspaceDocument {
  id: string;
  document_id: string;
  venture_id: string;
  title: string | null;
  file_url: string | null;
  uploaded_by: string | null;
  created_at: string;
}

interface WorkspaceNote {
  id: string;
  workspace_id: string;
  title: string;
  content: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

interface WorkspaceMember {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

interface WorkspaceActivityItem {
  id: string;
  workspace_id: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  performed_by: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

interface WorkspaceStatsData {
  documents: number;
  notes: number;
  members: number;
  advisors: number;
}

interface WorkspaceApiData {
  workspace: ApiWorkspace;
  stats: WorkspaceStatsData;
  documents: WorkspaceDocument[];
  notes: WorkspaceNote[];
  members: WorkspaceMember[];
  activities: WorkspaceActivityItem[];
}

interface WorkspaceApiResponse {
  success: boolean;
  data: WorkspaceApiData;
}

/* =========================================================
   FETCH WORKSPACE
========================================================= */

async function getWorkspace(
  id: string
): Promise<WorkspaceApiData | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/workspaces/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const result =
      (await response.json()) as WorkspaceApiResponse;

    if (
      !result.success ||
      !result.data ||
      !result.data.workspace
    ) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(
      "Workspace fetch error:",
      error
    );

    return null;
  }
}

/* =========================================================
   PAGE
========================================================= */

export default async function WorkspaceDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const workspaceData =
    await getWorkspace(id);

  if (!workspaceData) {
    notFound();
  }

  const workspace =
    workspaceData.workspace;

  /* =======================================================
     EXISTING WORKSPACE DETAIL UI STRUCTURE
  ======================================================= */

  const workspaceDetail = {
    id: workspace.id,

    name: workspace.workspace_name,

    status: "Active",

    description:
      workspace.workspace_description || "",

    owner:
      workspace.created_by || "Founder",

    created: new Date(
      workspace.created_at
    ).toLocaleDateString(),

    updated: new Date(
      workspace.updated_at
    ).toLocaleString(),

    documents:
      workspaceData.stats.documents,

    notes:
      workspaceData.stats.notes,

    members:
      workspaceData.stats.members,

    advisors:
      workspaceData.stats.advisors,
  };

  return (
    <div className="space-y-8">

      {/* HERO */}

      <WorkspaceHero
        workspace={workspaceDetail}
      />

      {/* STATS */}

      <WorkspaceStats
        workspace={workspaceDetail}
      />

      {/* DOCUMENTS + MEMBERS */}

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-7">
          <RecentDocuments
  workspaceId={workspaceData.workspace.id}
  documents={workspaceData.documents}
/>
        </div>

        <div className="col-span-5">
       <TeamMembers
  members={workspaceData.members}
  workspaceId={workspace.id}
/>
        </div>

      </div>

      {/* NOTES + ACTIVITY */}

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-7">
          <NotesSection
            notes={
              workspaceData.notes
            }
          />
        </div>

        <div className="col-span-5">
          <ActivityPanel
            activities={
              workspaceData.activities
            }
          />
        </div>

      </div>

      {/* BRAIN MAP + AI */}

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-4">
          <BrainMapCard
  workspaceId={workspace.id}
/>
        </div>

        <div className="col-span-8">
          <AIAdvisorCard />
        </div>

      </div>

    </div>
  );
}