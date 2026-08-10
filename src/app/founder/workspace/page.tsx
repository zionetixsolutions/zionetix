import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import WorkspaceSearchBar from "@/components/workspace/WorkspaceSearchBar";
import WorkspaceGrid from "@/components/workspace/WorkspaceGrid";
import WorkspaceActivity from "@/components/workspace/WorkspaceActivity";
import WorkspaceInsights from "@/components/workspace/WorkspaceInsights";

export default function WorkspacePage() {
  return (
    <div
      className="
      max-w-[1500px]
      mx-auto
      "
    >
      <WorkspaceHeader />

      <WorkspaceSearchBar />

      <WorkspaceGrid />

      <div
        className="
        mt-8
        grid
        grid-cols-12
        gap-6
        "
      >
        <div className="col-span-8">
          <WorkspaceActivity />
        </div>

        <div className="col-span-4">
          <WorkspaceInsights />
        </div>
      </div>

      <footer
        className="
        mt-10
        border-t
        pt-6
        flex
        justify-between
        text-sm
        text-zinc-400
        "
      >
        <span>
          © 2026 Primordial. All rights reserved.
        </span>

        <div className="flex gap-8">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Support</span>
        </div>
      </footer>
    </div>
  );
}