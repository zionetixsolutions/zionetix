"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Settings2,
  Shield,
  Users,
  Bell,
  FileText,
  Trash2,
  Archive,
  Lock,
  Globe,
  Eye,
  Download,
} from "lucide-react";

interface DocumentSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DocumentSettingsModal({
  open,
  onClose,
}: DocumentSettingsModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
          w-full
          max-w-3xl
          rounded-3xl
          bg-white
          border
          border-neutral-200
          shadow-2xl
          overflow-hidden
          "
        >
          {/* Header */}

          <div className="flex items-center justify-between px-8 py-6 border-b">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-neutral-100 flex items-center justify-center">
                <Settings2 className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Document Settings
                </h2>

                <p className="text-sm text-neutral-500 mt-1">
                  Configure permissions, privacy and workspace
                  preferences.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-neutral-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 p-8">
            {/* LEFT */}

            <div className="space-y-8">
              {/* Visibility */}

              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Eye size={18} />
                  Visibility
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center justify-between border rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Globe size={18} />

                      <div>
                        <p className="font-medium">
                          Workspace Visible
                        </p>

                        <p className="text-sm text-neutral-500">
                          Everyone in this venture can view.
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      defaultChecked
                    />
                  </label>

                  <label className="flex items-center justify-between border rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Lock size={18} />

                      <div>
                        <p className="font-medium">
                          Private
                        </p>

                        <p className="text-sm text-neutral-500">
                          Only invited members.
                        </p>
                      </div>
                    </div>

                    <input type="radio" />
                  </label>
                </div>
              </div>

              {/* Permissions */}

              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Users size={18} />
                  Permissions
                </h3>

                <div className="space-y-4">
                  <Toggle
                    title="Allow Editing"
                    desc="Members can edit this document."
                    defaultChecked
                  />

                  <Toggle
                    title="Allow Comments"
                    desc="Enable collaborative comments."
                    defaultChecked
                  />

                  <Toggle
                    title="Allow Sharing"
                    desc="Team members can share."
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="space-y-8">
              {/* Notifications */}

              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Bell size={18} />
                  Notifications
                </h3>

                <div className="space-y-4">
                  <Toggle
                    title="Version Updates"
                    desc="Notify when a new version is created."
                    defaultChecked
                  />

                  <Toggle
                    title="Comments"
                    desc="Receive comment notifications."
                    defaultChecked
                  />

                  <Toggle
                    title="AI Suggestions"
                    desc="Notify when AI generates improvements."
                    defaultChecked
                  />
                </div>
              </div>

              {/* Document */}

              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <FileText size={18} />
                  Document
                </h3>

                <div className="space-y-3">
                  <ActionButton
                    icon={<Download size={18} />}
                    title="Download Backup"
                  />

                  <ActionButton
                    icon={<Archive size={18} />}
                    title="Archive Document"
                  />

                  <ActionButton
                    icon={<Shield size={18} />}
                    title="Version Protection"
                  />
                </div>
              </div>

              {/* Danger */}

              <div className="border rounded-2xl border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <Trash2 className="text-red-600" />

                  <div className="flex-1">
                    <h4 className="font-semibold text-red-700">
                      Danger Zone
                    </h4>

                    <p className="text-sm text-red-600 mt-1">
                      Permanently delete this document. This
                      action cannot be undone.
                    </p>

                    <button
                      className="
                      mt-4
                      px-4
                      py-2
                      rounded-xl
                      bg-red-600
                      text-white
                      hover:bg-red-700
                      "
                    >
                      Delete Document
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="border-t px-8 py-5 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border hover:bg-neutral-100"
            >
              Cancel
            </button>

            <button
              className="
              px-6
              py-2.5
              rounded-xl
              bg-black
              text-white
              hover:bg-neutral-800
              "
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface ToggleProps {
  title: string;
  desc: string;
  defaultChecked?: boolean;
}

function Toggle({
  title,
  desc,
  defaultChecked,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between border rounded-xl p-4">
      <div>
        <p className="font-medium">{title}</p>

        <p className="text-sm text-neutral-500">
          {desc}
        </p>
      </div>

      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-5"
      />
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
}

function ActionButton({
  icon,
  title,
}: ActionButtonProps) {
  return (
    <button
      className="
      w-full
      flex
      items-center
      gap-3
      p-4
      border
      rounded-xl
      hover:bg-neutral-50
      transition
      "
    >
      {icon}

      <span className="font-medium">
        {title}
      </span>
    </button>
  );
}