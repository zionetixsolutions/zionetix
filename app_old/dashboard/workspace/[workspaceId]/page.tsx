"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Workspace {
  id: string;
  workspace_name: string;
}
interface Note {
  id: string;
  title: string;
}

interface WorkspaceFile {
  id: string;
  file_name: string;
}

interface Activity {
  id: string;
  action_type: string;
}

export default function WorkspacePage() {

  const params = useParams();

  const workspaceId =
    params.workspaceId as string;

  const [workspace, setWorkspace] =
    useState<Workspace | null>(null);

  const [loading, setLoading] =
    useState(true);
    
  const [notesCount, setNotesCount] =
  useState(0);

const [filesCount, setFilesCount] =
  useState(0);

const [activityCount, setActivityCount] =
  useState(0);

const [recentNotes, setRecentNotes] =
  useState<Note[]>([]);

const [recentFiles, setRecentFiles] =
  useState<WorkspaceFile[]>([]);

const [recentActivities, setRecentActivities] =
  useState<Activity[]>([]);

  useEffect(() => {

    if (!workspaceId) return;

    async function loadWorkspace() {

  try {

    const workspaceResponse =
      await fetch(
        `/api/workspace/${workspaceId}`
      );

    const workspaceData =
      await workspaceResponse.json();

    if (workspaceData.success) {

      setWorkspace(
        workspaceData.workspace
      );

    }

    const notesResponse =
      await fetch(
        `/api/workspace/notes?workspaceId=${workspaceId}`
      );

    const notesData =
      await notesResponse.json();

    if (notesData.success) {

      setNotesCount(
        notesData.notes.length
      );

      setRecentNotes(
        notesData.notes.slice(0, 5)
      );

    }

    const filesResponse =
      await fetch(
        `/api/workspace/files?workspaceId=${workspaceId}`
      );

    const filesData =
      await filesResponse.json();

    if (filesData.success) {

      setFilesCount(
        filesData.files.length
      );

      setRecentFiles(
        filesData.files.slice(0, 5)
      );

    }

    const activityResponse =
      await fetch(
        `/api/workspace/activity?workspaceId=${workspaceId}`
      );

    const activityData =
      await activityResponse.json();

    if (activityData.success) {

      setActivityCount(
        activityData.activities.length
      );

      setRecentActivities(
        activityData.activities.slice(0, 5)
      );

    }

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

}

    const timer =
      setTimeout(
        loadWorkspace,
        0
      );

    return () =>
      clearTimeout(timer);

  }, [workspaceId]);

  if (loading) {

    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );

  }

  return (
    <div className="p-8">
<div className="mb-8">

  <h1 className="text-3xl font-bold text-white">
    {workspace?.workspace_name}
  </h1>

  <p className="text-zinc-400 mt-2">
    Workspace Overview
  </p>

</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

  <Link
    href={`/dashboard/workspace/${workspaceId}/notes`}
    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-400 transition-all"
  >
    <h2 className="text-zinc-400">
      Notes
    </h2>

    <p className="text-4xl font-bold text-white mt-2">
      {notesCount}
    </p>
  </Link>

  <Link
    href={`/dashboard/workspace/${workspaceId}/files`}
    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-400 transition-all"
  >
    <h2 className="text-zinc-400">
      Files
    </h2>

    <p className="text-4xl font-bold text-white mt-2">
      {filesCount}
    </p>
  </Link>

  <Link
    href={`/dashboard/workspace/${workspaceId}/activity`}
    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-400 transition-all"
  >
    <h2 className="text-zinc-400">
      Activity
    </h2>

    <p className="text-4xl font-bold text-white mt-2">
      {activityCount}
    </p>
  </Link>

</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

    <h2 className="text-xl font-semibold text-white mb-4">
      Recent Notes
    </h2>

    <div className="space-y-3">

      {recentNotes.map((note) => (

        <div
          key={note.id}
          className="border-b border-zinc-800 pb-2"
        >

          <p className="text-white">
            {note.title}
          </p>

        </div>

      ))}

    </div>

  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

    <h2 className="text-xl font-semibold text-white mb-4">
      Recent Files
    </h2>

    <div className="space-y-3">

      {recentFiles.map((file) => (

        <div
          key={file.id}
          className="border-b border-zinc-800 pb-2"
        >

          <p className="text-white">
            {file.file_name}
          </p>

        </div>

      ))}

    </div>

  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">

    <h2 className="text-xl font-semibold text-white mb-4">
      Latest Activity
    </h2>

    <div className="space-y-3">

      {recentActivities.map((activity) => (

        <div
          key={activity.id}
          className="border-b border-zinc-800 pb-2"
        >

          <p className="text-white">
            {activity.action_type}
          </p>

        </div>

      ))}

    </div>

  </div>

</div>

    </div>
  );
}