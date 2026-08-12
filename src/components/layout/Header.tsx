"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  Settings,
} from "lucide-react";

export default function Header() {

  const pathname = usePathname();
type Profile = {
  full_name: string;
  profile_image: string | null;
};

const [profile, setProfile] = useState<Profile | null>(null);
   useEffect(() => {
  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
     console.log(data);
    if (data.success) {
      setProfile(data.profile);
    }
  };

  fetchProfile();
}, []);
  const getTitle = () => {
    if (pathname === "/founder")
      return "Dashboard";

    if (
      pathname.startsWith(
        "/founder/workspace"
      )
    )
      return "Workspace";

    if (
      pathname.startsWith(
        "/founder/documents"
      )
    )
      return "Documents";

    if (
      pathname.startsWith(
        "/founder/team"
      )
    )
      return "Team";

    if (
      pathname.startsWith(
        "/founder/brain-map"
      )
    )
      return "Brain Map";

    return "Dashboard";
  };

  return (
    <header
      className="
      h-20
      border-b
      border-zinc-200
      flex
      items-center
      justify-between
      px-8
      bg-white
      shrink-0
      "
    >
      <div
        className="
        text-sm
        tracking-wide
        text-zinc-500
        "
      >
        PRIMORDIAL /

        <span
          className="
          ml-2
          font-medium
          text-black
          "
        >
          {getTitle()}
        </span>
      </div>

      <div
        className="
        flex
        items-center
        border
        border-zinc-200
        rounded-xl
        h-12
        w-96
        px-4
        "
      >
        <Search
          size={18}
          className="text-zinc-400"
        />

        <input
          placeholder="Search venture workspace..."
          className="
          ml-3
          flex-1
          outline-none
          text-sm
          "
        />
      </div>

      <div
        className="
        flex
        items-center
        gap-6
        "
      >
        <Bell size={18} />

        <Settings size={18} />

        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <div className="text-right">
            <p className="font-semibold">
              {profile?.full_name || "Founder"}
            </p>

            <p className="text-xs text-zinc-500">
              Chief Executive
            </p>
          </div>

          {profile?.profile_image ? (
  <Image
    src={profile.profile_image}
    alt="Profile"
    width={40}
    height={40}
    className="rounded-full object-cover"
  />
) : (
  <div className="w-10 h-10 rounded-full bg-zinc-300" />
)}
        </div>
      </div>
    </header>
  );
}