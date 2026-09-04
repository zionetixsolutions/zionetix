import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* SIDEBAR */}
      <aside className="h-screen shrink-0 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* FIXED HEADER */}
        <header className="shrink-0">
          <Header />
        </header>

        {/* ONLY THIS AREA SCROLLS */}
        <main className="min-h-0 flex-1 overflow-y-auto bg-white p-8">
          {children}
        </main>

      </div>
    </div>
  );
}