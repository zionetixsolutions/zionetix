"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Briefcase,
  Bell,
  LogOut,
} from "lucide-react";

export default function TeamSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Documents",
      href: "/team-dashboard/documents",
      icon: FileText,
    },
    {
      name: "Workspace",
      href: "/team-dashboard/workspace",
      icon: Briefcase,
    },
    {
      name: "Notifications",
      href: "/team-dashboard/notifications",
      icon: Bell,
    },
  ];

  const logout = () => {
    localStorage.removeItem("teamMember");
    window.location.href = "/team-login";
  };

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen">

      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-white text-xl font-bold">
          PRIMORDIAL
        </h1>

        <p className="text-zinc-500 text-sm mt-1">
          Team Workspace
        </p>
      </div>

      <div className="p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? "bg-yellow-400 text-black"
                  : "text-zinc-400 hover:bg-zinc-900"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-zinc-900 mt-6"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </aside>
  );
}