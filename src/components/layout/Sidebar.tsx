"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  FolderOpen,
  Share2,
  FileText,
  Download,
  Users,
  ScrollText,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export default function Sidebar() {
  const pathname = usePathname();
const router = useRouter();
const handleLogout = async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Logout failed:", data.message);
      return;
    }

    router.replace("/");
    router.refresh();
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
  }
};
  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/founder",
      icon: LayoutGrid,
    },
    {
      label: "Workspace",
      href: "/founder/workspace",
      icon: FolderOpen,
    },
    {
      label: "Brain Map",
      href: "/founder/brain-map",
      icon: Share2,
    },
    {
      label: "Documents",
      href: "/founder/documents",
      icon: FileText,
    },
    {
      label: "Decision Inbox",
      href: "/founder/decision-inbox",
      icon: Download,
    },
    {
      label: "Team",
      href: "/founder/team",
      icon: Users,
    },
    {
      label: "Logs",
      href: "/founder/logs",
      icon: ScrollText,
    },
  ];

  return (
    <aside
      className="
      w-60
      border-r
      border-zinc-200
      bg-white
      flex
      flex-col
      shrink-0
      "
    >
      <div
        className="
        h-20
        px-8
        flex
        items-center
        border-b
        border-zinc-200
        "
      >
        <h1 className="font-bold text-xl">
          PRIMORDIAL
        </h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all

                  ${
                    active
                      ? "bg-zinc-100 text-black font-medium"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }
                `}
              >
                <Icon size={18} />

                {item.label}
              </Link>
            );
          })}
        </div>

        <div
          className="
          mt-10
          text-xs
          uppercase
          tracking-wider
          text-zinc-400
          px-4
          "
        >
          Support
        </div>

        <Link
          href="/founder/advisors"
          className="
          mt-3
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          hover:bg-zinc-50
          "
        >
          <Bot size={18} />
          AI Advisors
        </Link>
      </div>

      <div className="border-t border-zinc-200 p-5">
        <div
          className="
          border
          border-zinc-200
          rounded-2xl
          p-4
          mb-5
          "
        >
          <p className="text-xs text-zinc-400">
            ACTIVE VENTURE
          </p>

          <h3 className="mt-2 font-semibold">
            Startup Alpha
          </h3>

          <p className="text-sm text-zinc-500">
            VNT-2847-XK
          </p>
        </div>

        <button
          className="
          flex
          items-center
          gap-3
          py-2
          text-zinc-600
          "
        >
          <Settings size={18} />
          Settings
        </button>

        <button
          className="
          flex
          items-center
          gap-3
          py-2
          text-zinc-600
          "
            type="button"
            onClick={handleLogout}
           >
          <LogOut size={18} />
          <span>Logout</span>

        </button>
      </div>
    </aside>
  );
}