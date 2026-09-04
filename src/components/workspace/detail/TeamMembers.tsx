"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserPlus,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import AddMemberModal from "@/components/team/AddMemberModal";

interface TeamMember {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

interface Props {
  members: TeamMember[];
  workspaceId: string;
}

export default function TeamMembers({
  members,
  workspaceId,
}: Props) {
  const [inviteOpen, setInviteOpen] =
    useState(false);

  return (
    <>
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h3 className="font-semibold text-lg">
              Team Members
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              {members.length}{" "}
              {members.length === 1
                ? "member"
                : "members"}{" "}
              in this workspace
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setInviteOpen(true)
            }
            className="
              flex
              items-center
              gap-2
              bg-black
              text-white
              px-4
              py-2
              rounded-xl
              text-sm
              font-medium
              hover:opacity-90
              transition
            "
          >
            <UserPlus size={16} />

            Invite Member
          </button>
        </div>

        {/* EMPTY STATE */}

        {members.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div
              className="
                mx-auto
                w-12
                h-12
                rounded-xl
                bg-zinc-100
                flex
                items-center
                justify-center
                mb-4
              "
            >
              <UserPlus
                size={22}
                className="text-zinc-400"
              />
            </div>

            <p className="font-medium text-zinc-800">
              No team members
            </p>

            <p className="text-sm text-zinc-500 mt-1">
              Invite members to collaborate in
              this workspace.
            </p>

            <button
              type="button"
              onClick={() =>
                setInviteOpen(true)
              }
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                bg-black
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                hover:opacity-90
              "
            >
              <UserPlus size={16} />

              Invite Member
            </button>
          </div>
        ) : (
          <>
            {/* MEMBERS */}

            <div>
              {members.map(
                (member, index) => {
                  const initials =
                    member.full_name
                      ?.trim()
                      .split(/\s+/)
                      .filter(Boolean)
                      .map(
                        (name) =>
                          name[0]
                      )
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() ||
                    "?";

                  const isOwner =
                    index === 0;

                  return (
                    <div
                      key={member.id}
                      className="
                        flex
                        items-center
                        justify-between
                        px-6
                        py-4
                        border-b
                        last:border-b-0
                        hover:bg-zinc-50
                        transition
                      "
                    >
                      {/* MEMBER INFO */}

                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="
                            w-11
                            h-11
                            rounded-full
                            bg-zinc-100
                            flex
                            items-center
                            justify-center
                            shrink-0
                            text-sm
                            font-semibold
                            text-zinc-600
                          "
                        >
                          {initials}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-zinc-900 truncate">
                            {member.full_name ||
                              "Unknown Member"}
                          </p>

                          <p className="text-sm text-zinc-500 truncate">
                            {member.email}
                          </p>

                          <p className="text-xs text-zinc-400 mt-0.5 capitalize">
                            {member.role ||
                              "Member"}
                          </p>
                        </div>
                      </div>

                      {/* MEMBER ACTIONS */}

                      <div className="flex items-center gap-3 shrink-0">
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

                        <button
                          type="button"
                          aria-label={`Options for ${
                            member.full_name ||
                            "member"
                          }`}
                          className="
                            p-1.5
                            rounded-lg
                            hover:bg-zinc-100
                            transition
                          "
                        >
                          <MoreHorizontal
                            size={17}
                            className="text-zinc-500"
                          />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* FOOTER */}

            <div className="px-6 py-4">
              <Link
  href={`/founder/workspace/${workspaceId}/team`}
  className="flex items-center gap-2 text-sm font-medium hover:text-zinc-600"
>
  View all team members
  <ChevronRight size={16} />
</Link>
            </div>
          </>
        )}
      </div>

      {/* ADD MEMBER MODAL */}

      <AddMemberModal
        isOpen={inviteOpen}
        workspaceId={workspaceId}
        onClose={() =>
          setInviteOpen(false)
        }
      />
    </>
  );
}