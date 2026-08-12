import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-10">
          {children}
        </main>

      </div>

    </div>
  );
}