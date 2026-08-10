import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main
          className="
          flex-1
          overflow-y-auto
          bg-[#FAFAFA]
          "
        >
          {children}
        </main>

      </div>

    </div>
  );
}