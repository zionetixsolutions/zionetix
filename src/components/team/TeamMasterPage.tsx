"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Download,
  Users,
  UserCheck,
  Mail,
  Shield,
  Search,
  Filter,
} from "lucide-react";

import TeamTable from "./TeamTable";
import AddMemberModal from "./AddMemberModal";
import { useTeamMembers } from "@/hooks/useTeam";

export default function TeamMasterPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { members, loading, error, reload } = useTeamMembers();

  const filteredMembers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return members;
    }

    return members.filter((member) =>
      [member.name, member.email, member.member_id, member.role].some(
        (value) => value.toLowerCase().includes(search)
      )
    );
  }, [members, searchTerm]);

  const stats = [
    { number: members.length, label: "Total Members", icon: Users },
    {
      number: members.filter((member) => member.status === "Active").length,
      label: "Active Members",
      icon: UserCheck,
    },
    {
      number: members.filter((member) => member.status === "Pending Invite")
        .length,
      label: "Pending Invitations",
      icon: Mail,
    },
    {
      number: members.filter(
        (member) => member.role.toLowerCase() === "administrator"
      ).length,
      label: "Administrators",
      icon: Shield,
    },
  ];

  return (
    <>
      <AddMemberModal
        isOpen={showInvite}
        onClose={() => setShowInvite(false)}
        onSuccess={reload}
      />

      <div className="mx-auto max-w-[1700px] px-8 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold">Team</h1>
            <p className="mt-2 text-zinc-500">
              Manage workspace members, roles and invitations.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowInvite(true)}
              className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white"
            >
              <UserPlus size={18} />
              Invite Member
            </button>

            <button className="flex items-center gap-2 rounded-xl border px-5 py-3">
              <Download size={18} />
              Export Members
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                whileHover={{ y: -5 }}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="flex justify-between">
                  <Icon size={22} className="text-zinc-500" />
                  <span className="text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-8 text-3xl font-bold">{item.number}</h2>
                <p className="mt-2 text-sm uppercase tracking-wide text-zinc-500">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-xl font-semibold">Workspace Members</h2>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <Search size={18} className="text-zinc-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Filter members..."
                  className="w-64 border-none outline-none"
                />
              </div>

              <button className="flex items-center gap-2 rounded-xl border px-4">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {error ? (
            <div className="p-8 text-center text-sm text-red-600">{error}</div>
          ) : (
            <TeamTable
              members={filteredMembers}
              loading={loading}
              onRefresh={reload}
            />
          )}
        </div>
      </div>
    </>
  );
}
