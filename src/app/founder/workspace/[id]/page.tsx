import { notFound } from "next/navigation";

import { workspaceDetails }
from "@/data/workspaceDetailData";

import WorkspaceHero
from "@/components/workspace/detail/WorkspaceHero";

import WorkspaceStats
from "@/components/workspace/detail/WorkspaceStats";

import RecentDocuments
from "@/components/workspace/detail/RecentDocuments";

import TeamMembers
from "@/components/workspace/detail/TeamMembers";

import NotesSection
from "@/components/workspace/detail/NotesSection";

import ActivityPanel
from "@/components/workspace/detail/ActivityPanel";

import BrainMapCard
from "@/components/workspace/detail/BrainMapCard";

import AIAdvisorCard
from "@/components/workspace/detail/AIAdvisorCard";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkspaceDetailPage({
  params,
}: PageProps) {

  const { id } = await params;

  const workspace =
    workspaceDetails.find(
      (item) => item.id === id
    );

  if (!workspace) {
    notFound();
  }

  return (
    <div className="space-y-8">

      <WorkspaceHero
        workspace={workspace}
      />

      <WorkspaceStats
        workspace={workspace}
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