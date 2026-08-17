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

type TeamTableProps = {
  members: Member[];
  loading: boolean;
  onRefresh: () => void;
};

export default function TeamTable({
  members,
  loading,
  onRefresh,
}: TeamTableProps) {
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
              <th className="px-6 py-4" />
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-8 py-12 text-center text-zinc-500">
                  Loading members...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-12 text-center text-zinc-500">
                  No team members found.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <motion.tr
                  key={member.member_id}
                  whileHover={{ backgroundColor: "#fafafa" }}
                  className="border-b"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 font-semibold">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-zinc-500">{member.email}</p>
                        <p className="text-xs text-zinc-400">{member.member_id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">{member.role}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {member.status === "Active" ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Clock3 size={14} />
                      )}
                      {member.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-zinc-600">{member.lastActive}</td>
                  <td className="px-6 py-5 text-zinc-600">{member.joinedDate}</td>

                  <td className="relative px-6 py-5">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === member.member_id ? null : member.member_id)
                      }
                      className="rounded-lg p-2 hover:bg-zinc-100"
                      aria-label={`Actions for ${member.name}`}
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === member.member_id && (
                      <div className="absolute right-6 top-14 z-50 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">
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
                        <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-50">
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
              ))
            )}
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
        onSuccess={() => {
          setShowEdit(false);
          onRefresh();
        }}
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
        onSuccess={() => {
          setShowRemove(false);
          onRefresh();
        }}
      />
    </>
  );
}
