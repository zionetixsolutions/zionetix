import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  UserPlus,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface TeamMember {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Unknown";
  }

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function WorkspaceTeamPage({
  params,
}: PageProps) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    notFound();
  }

  /* =====================================================
     GET WORKSPACE
  ===================================================== */

  const {
    data: workspace,
    error: workspaceError,
  } = await supabase
    .from("workspaces")
    .select(
      "id, workspace_name, venture_id"
    )
    .eq("id", id)
    .maybeSingle();

  if (workspaceError) {
    console.error(
      "Workspace Team - Workspace Error:",
      workspaceError
    );
  }

  if (!workspace) {
    console.error(
      "Workspace Team - Workspace not found:",
      id
    );

    notFound();
  }

  /* =====================================================
     GET TEAM MEMBERS
  ===================================================== */

  const {
    data: members,
    error: membersError,
  } = await supabase
    .from("team_members")
    .select(
      `
        id,
        member_id,
        full_name,
        email,
        role,
        created_at
      `
    )
    .eq("venture_id", workspace.venture_id)
    .order("created_at", {
      ascending: true,
    });

  if (membersError) {
    console.error(
      "Workspace Team - Members Error:",
      membersError
    );

    return (
      <div className="max-w-[1400px] mx-auto">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-xl font-semibold text-red-600">
            Failed to load team members
          </h1>

          <p className="mt-2 text-sm text-red-500">
            {membersError.message}
          </p>

          <Link
            href={`/founder/workspace/${id}`}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-black
              px-5
              py-3
              text-sm
              font-medium
              text-white
            "
          >
            <ArrowLeft size={16} />
            Back to Workspace
          </Link>
        </div>
      </div>
    );
  }

  const workspaceMembers =
    (members ?? []) as TeamMember[];

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <Link
            href={`/founder/workspace/${id}`}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-zinc-500
              hover:text-black
              mb-5
            "
          >
            <ArrowLeft size={16} />
            Back to Workspace
          </Link>

          <h1 className="text-4xl font-bold tracking-tight">
            All Team Members
          </h1>

          <p className="mt-2 text-zinc-500">
            {workspace.workspace_name}
          </p>
        </div>

        <div className="text-sm text-zinc-500">
          {workspaceMembers.length}{" "}
          {workspaceMembers.length === 1
            ? "member"
            : "members"}
        </div>

      </div>

      {/* MEMBERS */}

      {workspaceMembers.length === 0 ? (

        <div
          className="
            bg-white
            border
            border-zinc-200
            rounded-3xl
            py-20
            text-center
          "
        >
          <UserPlus
            size={40}
            className="mx-auto text-zinc-300"
          />

          <h2 className="mt-4 font-semibold text-lg">
            No team members yet
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Invite members to collaborate in
            this workspace.
          </p>
        </div>

      ) : (

        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">

          {workspaceMembers.map(
            (member, index) => {

              const initials =
                member.full_name
                  ?.trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .map(
                    (name) => name[0]
                  )
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "?";

              const isOwner = index === 0;

              return (
                <div
                  key={member.id}
                  className="
                    flex
                    items-center
                    justify-between
                    px-8
                    py-6
                    border-b
                    last:border-b-0
                    hover:bg-zinc-50
                    transition
                  "
                >

                  {/* MEMBER */}

                  <div className="flex items-center gap-4 min-w-0">

                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        bg-zinc-100
                        flex
                        items-center
                        justify-center
                        shrink-0
                        font-semibold
                        text-zinc-600
                      "
                    >
                      {initials}
                    </div>

                    <div className="min-w-0">

                      <p className="font-semibold text-zinc-900">
                        {member.full_name ||
                          "Unknown Member"}
                      </p>

                      <p className="text-sm text-zinc-500 mt-1">
                        {member.email}
                      </p>

                      <p className="text-xs text-zinc-400 mt-1">
                        {member.role ||
                          "Member"}
                      </p>

                    </div>
                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-6 shrink-0">

                    <span
                      className={`
                        text-[10px]
                        font-semibold
                        px-3
                        py-1
                        rounded-full
                        tracking-wide
                        ${
                          isOwner
                            ? "bg-amber-50 text-amber-700"
                            : "bg-zinc-100 text-zinc-600"
                        }
                      `}
                    >
                      {isOwner
                        ? "OWNER"
                        : "MEMBER"}
                    </span>

                    <span className="text-xs text-zinc-400">
                      Joined{" "}
                      {formatDate(
                        member.created_at
                      )}
                    </span>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
}