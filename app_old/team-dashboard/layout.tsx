// app/team-dashboard/layout.tsx

import TeamSidebar from "@/components/team/TeamSidebar";

export default function TeamDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      <TeamSidebar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}