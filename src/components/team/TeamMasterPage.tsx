"use client";

import { useState } from "react";
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

const stats = [
  {
    number: "12",
    label: "Total Members",
    icon: Users,
  },
  {
    number: "10",
    label: "Active Members",
    icon: UserCheck,
  },
  {
    number: "02",
    label: "Pending Invitations",
    icon: Mail,
  },
  {
    number: "03",
    label: "Administrators",
    icon: Shield,
  },
];

export default function TeamMasterPage() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <>
      <AddMemberModal
        isOpen={showInvite}
        onClose={() => setShowInvite(false)}
      />

      <div className="max-w-[1700px] mx-auto px-8 py-8">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Team
            </h1>

            <p className="mt-2 text-zinc-500">
              Manage workspace members, roles and invitations.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setShowInvite(true)}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-black
                px-5
                py-3
                text-white
              "
            >
              <UserPlus size={18} />

              Invite Member
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-5
                py-3
              "
            >
              <Download size={18} />

              Export Members
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-6 mt-10">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className="
                  rounded-2xl
                  border
                  bg-white
                  p-6
                  shadow-sm
                "
              >

                <div className="flex justify-between">

                  <Icon
                    size={22}
                    className="text-zinc-500"
                  />

                  <span className="text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <h2 className="mt-8 text-3xl font-bold">
                  {item.number}
                </h2>

                <p className="mt-2 text-sm text-zinc-500 uppercase tracking-wide">
                  {item.label}
                </p>

              </motion.div>

            );

          })}

        </div>

        {/* Table */}

        <div
          className="
            mt-10
            rounded-3xl
            border
            bg-white
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              p-6
            "
          >

            <h2 className="text-xl font-semibold">
              Workspace Members
            </h2>

            <div className="flex gap-3">

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-3
                  py-2
                "
              >

                <Search
                  size={18}
                  className="text-zinc-400"
                />

                <input
                  placeholder="Filter members..."
                  className="
                    w-64
                    border-none
                    outline-none
                  "
                />

              </div>

              <button
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-4
                "
              >
                <Filter size={18} />

                Filter
              </button>

            </div>

          </div>

          <TeamTable />

        </div>

      </div>
    </>
  );
}