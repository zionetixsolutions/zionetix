"use client";
import { useState } from "react";
import type { Member } from "@/types/member";
import TeamMemberDetails from "./teamMemberDetails";
import EditMemberModal from "./EditMemberModal";
import ManageRolePermissionsModal from "./ManageRolePermissionsModal";
import TeamRemoveModal from "./TeamRemoveModal";
import { motion } from "framer-motion";
import {
  MoreVertical,
  CheckCircle2,
  Clock3,
   Eye,
  Pencil,
  Shield,
  Trash2,
  Send,
} from "lucide-react";
const members: Member[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@startupalpha.io",
    role: "Founder",
    status: "Active",
    lastActive: "2 minutes ago",
    joinedDate: "12 Jan 2026",
  },
  {
    id: "2",
    name: "Alex Rivera",
    email: "alex@startupalpha.io",
    role: "Administrator",
    status: "Active",
    lastActive: "15 minutes ago",
    joinedDate: "28 Feb 2026",
  },
  {
    id: "3",
    name: "Emily Carter",
    email: "emily@startupalpha.io",
    role: "Editor",
    status: "Pending Invite",
    lastActive: "—",
    joinedDate: "18 Jul 2026",
  },
];

export default function TeamTable() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [showDetails, setShowDetails] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [showPermissions, setShowPermissions] = useState(false);

  const [showRemove, setShowRemove] = useState(false);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="border-b bg-zinc-50">

          <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">

            <th className="px-8 py-4">Member</th>

            <th className="px-6 py-4">Role</th>

            <th className="px-6 py-4">Status</th>

            <th className="px-6 py-4">Last Active</th>

            <th className="px-6 py-4">Joined Date</th>

            <th className="px-6 py-4"></th>

          </tr>

        </thead>

        <tbody>

          {members.map((member) => (

            <motion.tr
              key={member.id}
              whileHover={{
                backgroundColor: "#fafafa",
              }}
              className="border-b"
            >

              {/* Member */}

              <td className="px-8 py-5">

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-zinc-200
                      font-semibold
                    "
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>

                    <p className="font-semibold">
                      {member.name}
                    </p>

                    <p className="text-sm text-zinc-500">
                      {member.email}
                    </p>

                  </div>

                </div>

              </td>

              {/* Role */}

              <td className="px-6 py-5">

                {member.role}

              </td>

              {/* Status */}

              <td className="px-6 py-5">

                {member.status === "Active" ? (

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      bg-green-100
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-green-700
                    "
                  >
                    <CheckCircle2 size={14} />

                    Active

                  </span>

                ) : (

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      bg-yellow-100
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-yellow-700
                    "
                  >
                    <Clock3 size={14} />

                    Pending Invite

                  </span>

                )}

              </td>

              {/* Last Active */}

              <td className="px-6 py-5 text-zinc-600">

                {member.lastActive}

              </td>

              {/* Joined */}

              <td className="px-6 py-5 text-zinc-600">

                {member.joinedDate}

              </td>

              {/* Menu */}

              <td className="relative px-6 py-5">

  <button
    onClick={() =>
      setOpenMenu(
        openMenu === member.id
          ? null
          : member.id
      )
    }
    className="rounded-lg p-2 hover:bg-zinc-100"
  >
    <MoreVertical size={18} />
  </button>

  {openMenu === member.id && (

    <div
      className="
      absolute
      right-6
      top-14
      z-50
      w-56
      rounded-2xl
      border
      bg-white
      shadow-xl
      overflow-hidden
      "
    >

      <button
        onClick={() => {
          setSelectedMember(member);
          setShowDetails(true);
          setOpenMenu(null);
        }}
        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-50"
      >
        <Eye size={17} />
        View Member
      </button>

      <button
        onClick={() => {
          setSelectedMember(member);
          setShowEdit(true);
          setOpenMenu(null);
        }}
        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-50"
      >
        <Pencil size={17} />
        Edit Member
      </button>

      <button
        onClick={() => {
          setSelectedMember(member);
          setShowPermissions(true);
          setOpenMenu(null);
        }}
        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-50"
      >
        <Shield size={17} />
        Manage Permissions
      </button>

      <div className="border-t" />

      <button
        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-50"
      >
        <Send size={17} />
        Resend Invitation
      </button>

      <div className="border-t" />

      <button
        onClick={() => {
          setSelectedMember(member);
          setShowRemove(true);
          setOpenMenu(null);
        }}
        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <Trash2 size={17} />
        Remove Member
      </button>

    </div>

  )}

</td>

            </motion.tr>

          ))}

        </tbody>

      </table>

    </div>
    <TeamMemberDetails
  open={showDetails}
  member={selectedMember}
  onClose={() => setShowDetails(false)}
/>

<EditMemberModal
  isOpen={showEdit}
  member={selectedMember}
  onClose={() => setShowEdit(false)}
  onSuccess={() => setShowEdit(false)}
/>

<ManageRolePermissionsModal
  isOpen={showPermissions}
  member={selectedMember}
  onClose={() => setShowPermissions(false)}
/>

<TeamRemoveModal
  isOpen={showRemove}
  member={selectedMember}
  onClose={() => setShowRemove(false)}
/>
</>
  );
}