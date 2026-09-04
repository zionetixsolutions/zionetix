import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/* =========================================================
   GET WORKSPACE
========================================================= */

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Workspace
    const { data: workspace, error: workspaceError } =
      await supabase
        .from("workspaces")
        .select("*")
        .eq("id", id)
        .single();

    if (workspaceError || !workspace) {
      return NextResponse.json(
        {
          success: false,
          message:
            workspaceError?.message ||
            "Workspace not found",
        },
        { status: 404 }
      );
    }

    // Documents
    const {
      data: documents,
      error: documentsError,
    } = await supabase
      .from("document")
      .select("*")
      .eq("venture_id", workspace.venture_id)
      .order("created_at", {
        ascending: false,
      });

    if (documentsError) {
      console.error(
        "Workspace Documents Error:",
        documentsError
      );
    }

    // Notes
    const {
      data: notes,
      error: notesError,
    } = await supabase
      .from("workspace_notes")
      .select("*")
      .eq("workspace_id", id)
      .order("created_at", {
        ascending: false,
      });

    if (notesError) {
      console.error(
        "Workspace Notes Error:",
        notesError
      );
    }

    // Team members
    const {
      data: members,
      error: membersError,
    } = await supabase
      .from("team_members")
      .select(
        `
          id,
          member_id,
          full_name,
          email,
          role,
          created_at
        `
      )
      .eq("venture_id", workspace.venture_id)
      .order("created_at", {
        ascending: true,
      });

    if (membersError) {
      console.error(
        "Workspace Members Error:",
        membersError
      );
    }

    // Activity
    const {
      data: activities,
      error: activitiesError,
    } = await supabase
      .from("workspace_activity")
      .select("*")
      .eq("workspace_id", id)
      .order("created_at", {
        ascending: false,
      });

    if (activitiesError) {
      console.error(
        "Workspace Activity Error:",
        activitiesError
      );
    }

    return NextResponse.json({
      success: true,

      data: {
        workspace,

        stats: {
          documents: documents?.length ?? 0,
          notes: notes?.length ?? 0,
          members: members?.length ?? 0,
          advisors: 0,
        },

        documents: documents ?? [],
        notes: notes ?? [],
        members: members ?? [],
        activities: activities ?? [],
      },
    });
  } catch (error) {
    console.error(
      "Workspace Detail API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch workspace",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   UPDATE WORKSPACE
========================================================= */

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const workspaceName =
      typeof body.workspace_name === "string"
        ? body.workspace_name.trim()
        : "";

    const workspaceDescription =
      typeof body.workspace_description === "string"
        ? body.workspace_description.trim()
        : "";

    if (!workspaceName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Workspace name is required",
        },
        { status: 400 }
      );
    }

    /* -----------------------------------------------------
       Check workspace exists
    ----------------------------------------------------- */

    const {
      data: existingWorkspace,
      error: existingWorkspaceError,
    } = await supabase
      .from("workspaces")
      .select("id")
      .eq("id", id)
      .single();

    if (
      existingWorkspaceError ||
      !existingWorkspace
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            existingWorkspaceError?.message ||
            "Workspace not found",
        },
        { status: 404 }
      );
    }

    /* -----------------------------------------------------
       Update workspace
    ----------------------------------------------------- */

    const {
      data: updatedWorkspace,
      error: updateError,
    } = await supabase
      .from("workspaces")
      .update({
        workspace_name: workspaceName,
        workspace_description:
          workspaceDescription,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (updateError) {
      console.error(
        "Workspace Update Error:",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          message: updateError.message,
          error: updateError,
        },
        { status: 500 }
      );
    }

    /* -----------------------------------------------------
       Activity log
    ----------------------------------------------------- */

    const { error: activityError } =
      await supabase
        .from("workspace_activity")
        .insert({
          workspace_id: id,
          action_type: "UPDATE_WORKSPACE",
          entity_type: "WORKSPACE",
          entity_id: id,
          performed_by: "Founder",
          metadata: {
            workspace_name: workspaceName,
          },
        });

    if (activityError) {
      console.error(
        "Workspace Activity Insert Error:",
        activityError
      );

      /*
       * Don't fail the workspace update just because
       * activity logging failed.
       */
    }

    return NextResponse.json({
      success: true,
      message:
        "Workspace updated successfully",
      data: updatedWorkspace,
    });
  } catch (error) {
    console.error(
      "Workspace PATCH API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update workspace",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE WORKSPACE
========================================================= */

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    /* -----------------------------------------------------
       Check workspace exists
    ----------------------------------------------------- */

    const {
      data: workspace,
      error: workspaceError,
    } = await supabase
      .from("workspaces")
      .select("id, workspace_name, venture_id")
      .eq("id", id)
      .single();

    if (workspaceError || !workspace) {
      return NextResponse.json(
        {
          success: false,
          message:
            workspaceError?.message ||
            "Workspace not found",
        },
        { status: 404 }
      );
    }

    /* -----------------------------------------------------
       Delete workspace notes
    ----------------------------------------------------- */

    const {
      error: notesDeleteError,
    } = await supabase
      .from("workspace_notes")
      .delete()
      .eq("workspace_id", id);

    if (notesDeleteError) {
      console.error(
        "Workspace Notes Delete Error:",
        notesDeleteError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            notesDeleteError.message ||
            "Failed to delete workspace notes",
        },
        { status: 500 }
      );
    }

    /* -----------------------------------------------------
       Delete workspace activity
    ----------------------------------------------------- */

    const {
      error: activityDeleteError,
    } = await supabase
      .from("workspace_activity")
      .delete()
      .eq("workspace_id", id);

    if (activityDeleteError) {
      console.error(
        "Workspace Activity Delete Error:",
        activityDeleteError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            activityDeleteError.message ||
            "Failed to delete workspace activity",
        },
        { status: 500 }
      );
    }

    /* -----------------------------------------------------
       Delete workspace storage files
       
       Documents are currently linked through venture_id,
       so don't delete document DB records here.
       
       Instead, remove only files physically stored under:
       
       workspaces/{workspaceId}/...
    ----------------------------------------------------- */

    const storageFolder =
      `workspaces/${id}`;

    const {
      data: storageFiles,
      error: storageListError,
    } = await supabase.storage
      .from("Documents")
      .list(storageFolder, {
        limit: 1000,
      });

    if (storageListError) {
      console.error(
        "Workspace Storage List Error:",
        storageListError
      );
    }

    if (
      storageFiles &&
      storageFiles.length > 0
    ) {
      const storagePaths =
        storageFiles
          .filter(
            (file) =>
              file.name &&
              file.name !== ".emptyFolderPlaceholder"
          )
          .map(
            (file) =>
              `${storageFolder}/${file.name}`
          );

      if (storagePaths.length > 0) {
        const {
          error: storageDeleteError,
        } = await supabase.storage
          .from("Documents")
          .remove(storagePaths);

        if (storageDeleteError) {
          console.error(
            "Workspace Storage Delete Error:",
            storageDeleteError
          );

          return NextResponse.json(
            {
              success: false,
              message:
                storageDeleteError.message ||
                "Failed to delete workspace files",
            },
            { status: 500 }
          );
        }
      }
    }

    /* -----------------------------------------------------
       Delete workspace
    ----------------------------------------------------- */

    const {
      error: deleteError,
    } = await supabase
      .from("workspaces")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(
        "Workspace Delete Error:",
        deleteError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            deleteError.message ||
            "Failed to delete workspace",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Workspace deleted successfully",
      data: {
        id: workspace.id,
        workspace_name:
          workspace.workspace_name,
      },
    });
  } catch (error) {
    console.error(
      "Workspace DELETE API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete workspace",
      },
      { status: 500 }
    );
  }
}