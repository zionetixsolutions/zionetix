"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Member } from "@/types/member";
import {
  X,
  Shield,
  UserCog,
  Save,
} from "lucide-react";

interface ManageRolePermissionsModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
}

const roleDescriptions = {
  Founder:
    "Founders have unrestricted access to every module and workspace setting.",

  Administrator:
    "Administrators can manage members, documents, settings and workspace permissions.",

  Manager:
    "Managers can manage projects, documents and assigned team members.",

  Developer:
    "Developers can access development modules and collaborate on projects.",

  Designer:
    "Designers can access design resources and collaborate on documents.",

  Editor:
    "Editors can create and update workspace documents.",

  Viewer:
    "Viewers have read-only access to workspace resources.",
};

export default function ManageRolePermissionsModal({
  isOpen,
  member,
  onClose,
}: ManageRolePermissionsModalProps) {

  const [role, setRole] = useState(() => member?.role ?? "Developer");

  const [permissions, setPermissions] = useState({
    workspaceView: true,
    workspaceEdit: false,

    documentsView: true,
    documentsCreate: true,
    documentsDelete: false,

    brainMapView: true,
    brainMapEdit: false,

    aiAdvisor: true,
    decisions: true,
    logs: false,
    settings: false,
  });

  const togglePermission = (
    key: keyof typeof permissions
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>

      <motion.div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: .96,
          y: 25,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: .96,
          y: 25,
        }}
        transition={{
          duration: .25,
        }}
        className="
    fixed
    left-1/2
    top-1/2
    z-50
    w-[560px]
    max-w-[92vw]
    max-h-[80vh]
    -translate-x-1/2
    -translate-y-1/2
  "
>

        
<div
  className="
    flex
    max-h-[80vh]
    flex-col
    overflow-hidden
    rounded-3xl
    border
    bg-white
    shadow-2xl
  "
>
          {/* Header */}

          <div className="flex items-start justify-between border-b px-6 py-5">

            <div>

              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Manage Role & Permissions
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Update this members workspace role and access permissions.
              </p>

            </div>

            <button
              onClick={onClose}
              className="
              rounded-xl
              p-2
              transition
              hover:bg-zinc-100
              "
            >
              <X size={20} />
            </button>

          </div>

          {/* Scroll Body */}

         <div
className="
    flex-1
    overflow-y-auto
    px-5
    py-5
    space-y-5
  "
>

            {/* Member */}

            <div
              className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-zinc-200
              bg-zinc-50
              p-4
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-lg
                  font-bold
                  text-white
                  "
                >
                  {member?.full_name?.charAt(0)}
                </div>

                <div>

                  <h3 className="font-semibold text-zinc-900">
                    {member?.full_name}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {member?.email}
                  </p>

                </div>

              </div>

              <span
                className="
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-green-700
                "
              >
                Active
              </span>

            </div>

            {/* Workspace Role */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-700">

                <UserCog size={18} />

                Workspace Role

              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
                w-full
                rounded-2xl
                border
                border-zinc-300
                bg-white
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-black
                "
              >
                <option>Founder</option>
                <option>Administrator</option>
                <option>Manager</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>

              <div
                className="
                mt-4
                rounded-2xl
                border-l-4
                border-amber-400
                bg-amber-50
                p-4
                text-sm
                italic
                text-zinc-600
                "
              >
                {
                  roleDescriptions[
                    role as keyof typeof roleDescriptions
                  ]
                }
              </div>

            </div>

            {/* ========================= */}
            {/* PART 2 STARTS FROM HERE */}
            {/* Permissions Section */}
            {/* Permissions */}

<div>

  <div className="mb-4 flex items-center gap-2">

    <Shield size={18} />

    <h3 className="text-base font-semibold text-zinc-900">
      Access Permissions
    </h3>

  </div>

  <div className="grid grid-cols-2 gap-3">

    {/* Workspace */}

    <div className="rounded-2xl border border-zinc-200 p-4">

      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
        Workspace
      </h4>

      <div className="space-y-3">

        <label className="flex items-center justify-between">

          <span className="text-sm">View Workspace</span>

          <input
            type="checkbox"
            checked={permissions.workspaceView}
            onChange={() => togglePermission("workspaceView")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">Edit Workspace</span>

          <input
            type="checkbox"
            checked={permissions.workspaceEdit}
            onChange={() => togglePermission("workspaceEdit")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

      </div>

    </div>

    {/* Documents */}

    <div className="rounded-2xl border border-zinc-200 p-4">

      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
        Documents
      </h4>

      <div className="space-y-3">

        <label className="flex items-center justify-between">

          <span className="text-sm">View Documents</span>

          <input
            type="checkbox"
            checked={permissions.documentsView}
            onChange={() => togglePermission("documentsView")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">Create Documents</span>

          <input
            type="checkbox"
            checked={permissions.documentsCreate}
            onChange={() => togglePermission("documentsCreate")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">Delete Documents</span>

          <input
            type="checkbox"
            checked={permissions.documentsDelete}
            onChange={() => togglePermission("documentsDelete")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

      </div>

    </div>

    {/* Brain Map */}

    <div className="rounded-2xl border border-zinc-200 p-4">

      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
        Brain Map
      </h4>

      <div className="space-y-3">

        <label className="flex items-center justify-between">

          <span className="text-sm">View Brain Map</span>

          <input
            type="checkbox"
            checked={permissions.brainMapView}
            onChange={() => togglePermission("brainMapView")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">Edit Brain Map</span>

          <input
            type="checkbox"
            checked={permissions.brainMapEdit}
            onChange={() => togglePermission("brainMapEdit")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

      </div>

    </div>

    {/* Other Modules */}

    <div className="rounded-2xl border border-zinc-200 p-4">

      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
        Other Modules
      </h4>

      <div className="space-y-3">

        <label className="flex items-center justify-between">

          <span className="text-sm">AI Advisor</span>

          <input
            type="checkbox"
            checked={permissions.aiAdvisor}
            onChange={() => togglePermission("aiAdvisor")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">Decision Inbox</span>

          <input
            type="checkbox"
            checked={permissions.decisions}
            onChange={() => togglePermission("decisions")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">Logs</span>

          <input
            type="checkbox"
            checked={permissions.logs}
            onChange={() => togglePermission("logs")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">Settings</span>

          <input
            type="checkbox"
            checked={permissions.settings}
            onChange={() => togglePermission("settings")}
            className="h-4 w-4 accent-green-600"
          />

        </label>

      </div>

    </div>

  </div>

</div>

</div>

{/* Footer */}
<div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white px-5 py-3">

  <button
    onClick={onClose}
    className="
      rounded-xl
      border
      border-zinc-300
      px-3
      py-2.5
      font-medium
      transition
      hover:bg-zinc-100
    "
  >
    Cancel
  </button>

  <button
    onClick={() => {

      console.log({
        role,
        permissions,
      });

      onClose();

    }}
    className="
      flex
      items-center
      gap-2
      rounded-xl
      bg-black
      px-5
      py-2.5
      font-medium
      text-white
      transition
      hover:bg-zinc-800
    "
  >
    <Save size={16} />
    Save Changes
  </button>

</div>

</div>

</motion.div>

</AnimatePresence>

);

}