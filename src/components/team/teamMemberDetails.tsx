"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending Invite";
  lastActive: string;
  joinedDate: string;
  avatarUrl?: string;
};
interface TeamMemberDetailsProps {
  open: boolean;
  member: Member | null;
  onClose: () => void;
}

export default function TeamMemberDetails({
  open,
  member,
  onClose,
}: TeamMemberDetailsProps) {
  return (
    <AnimatePresence>

      {open && (

        <>

          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black"
          />

          {/* Drawer */}

          <motion.aside
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 30,
            }}
            className="
              fixed
              right-0
              top-0
              z-50
              h-screen
              w-[430px]
              overflow-y-auto
              border-l
              bg-white
              shadow-2xl
            "
          >

            {/* Header */}

            <div
              className="
                sticky
                top-0
                flex
                items-center
                justify-between
                border-b
                bg-white
                p-6
              "
            >

              <div>

                <h2 className="text-2xl font-bold">
                  Member Details
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Workspace Member Information
                </p>

              </div>

              <button
                onClick={onClose}
                className="
                  rounded-xl
                  p-2
                  hover:bg-zinc-100
                "
              >
                <X />
              </button>

            </div>

            {/* Body */}

<div className="p-6 space-y-6">
  <div className="flex items-center gap-4">
    {member?.avatarUrl ? (
      <img
        src={member.avatarUrl}
        alt={member.name}
        className="w-16 h-16 rounded-full object-cover"
      />
    ) : (
      <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center">
        {member?.name?.charAt(0)}
      </div>
    )}

    <div>
      <h3 className="text-xl font-semibold">
        {member?.name}
      </h3>

      <p className="text-zinc-500">
        {member?.email}
      </p>
    </div>
  </div>

  <div className="space-y-3">
    <div>
      <p className="text-xs text-zinc-500 uppercase">Role</p>
      <p>{member?.role}</p>
    </div>

    <div>
      <p className="text-xs text-zinc-500 uppercase">Status</p>
      <p>{member?.status}</p>
    </div>

    <div>
      <p className="text-xs text-zinc-500 uppercase">Joined</p>
      <p>{member?.joinedDate}</p>
    </div>

    <div>
      <p className="text-xs text-zinc-500 uppercase">Last Active</p>
      <p>{member?.lastActive}</p>
    </div>
  </div>
</div>

          </motion.aside>

        </>

      )}

    </AnimatePresence>
  );
}