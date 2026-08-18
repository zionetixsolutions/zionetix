import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Workspace
    const { data: workspace, error: workspaceError } =
      await supabase
        .from("workspaces")
        .select("*")
        .eq("id", id)
        .single();

    if (workspaceError) {
      console.error(
        "Workspace Overview - Workspace Error:",
        workspaceError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Workspace not found",
        },
        { status: 404 }
      );
    }

    // 2. Files
    const { data: files, error: filesError } =
      await supabase
        .from("workspace_files")
        .select("*")
        .eq("workspace_id", id)
        .order("created_at", {
          ascending: false,
        });

    if (filesError) {
      console.error(
        "Workspace Overview - Files Error:",
        filesError
      );
    }

    // 3. Notes
    const { data: notes, error: notesError } =
      await supabase
        .from("workspace_notes")
        .select("*")
        .eq("workspace_id", id)
        .order("created_at", {
          ascending: false,
        });

    if (notesError) {
      console.error(
        "Workspace Overview - Notes Error:",
        notesError
      );
    }

    // 4. Team members
    // team_members table has venture_id, not workspace_id
    const { data: members, error: membersError } =
      await supabase
        .from("team_members")
        .select(
          "id, member_id, full_name, email, role, created_at"
        )
        .eq("venture_id", workspace.venture_id)
        .order("created_at", {
          ascending: true,
        });

    if (membersError) {
      console.error(
        "Workspace Overview - Members Error:",
        membersError
      );
    }

    // 5. Activity
    const {
      data: activities,
      error: activitiesError,
    } = await supabase
      .from("workspace_activity")
      .select("*")
      .eq("workspace_id", id)
      .order("created_at", {
        ascending: false,
      })
      .limit(10);

    if (activitiesError) {
      console.error(
        "Workspace Overview - Activity Error:",
        activitiesError
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        workspace,

        stats: {
          documents: files?.length ?? 0,
          notes: notes?.length ?? 0,
          members: members?.length ?? 0,

          // AI integration will be connected later
          advisors: 0,
        },

        documents: files ?? [],
        notes: notes ?? [],
        members: members ?? [],
        activities: activities ?? [],
      },
    });
  } catch (error) {
    console.error(
      "Workspace Overview API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch workspace overview",
      },
      { status: 500 }
    );
  }
}