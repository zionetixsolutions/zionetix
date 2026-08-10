import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { logActivity } from "@/lib/activity";
export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json();

    const {
      workspaceId,
      title,
      content,
      createdBy,
    } = body;

    const { data, error } =
      await supabase
        .from("workspace_notes")
        .insert({
          workspace_id:
            workspaceId,
          title,
          content,
          created_by:
            createdBy,
        })
        .select()
        .single();
        await logActivity({
  workspaceId,
  actionType:
    "CREATE_NOTE",
  entityType:
    "NOTE",
  entityId:
    data.id,
  performedBy:
    createdBy,
  metadata: {
    title,
  },
});

    if (error) {

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        { status: 400 }
      );

    }

    return NextResponse.json({
      success: true,
      note: data,
    });

  } catch (error) {

    console.error(
      "CREATE NOTE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      { status: 500 }
    );

  }
  
}
export async function GET(
  req: Request
) {

  try {

    const { searchParams } =
      new URL(req.url);

    const workspaceId =
      searchParams.get(
        "workspaceId"
      );

    const { data, error } =
      await supabase
        .from(
          "workspace_notes"
        )
        .select("*")
        .eq(
          "workspace_id",
          workspaceId
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        { status: 400 }
      );

    }

    return NextResponse.json({
      success: true,
      notes: data,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      { status: 500 }
    );

  }

}
export async function PUT(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      noteId,
      title,
      content,
      updatedBy,
    } = body;

    const { data, error } =
      await supabase
        .from(
          "workspace_notes"
        )
        .update({
          title,
          content,
          updated_by:
            updatedBy,
          updated_at:
            new Date(),
        })
        .eq(
          "id",
          noteId
        )
        .select()
        .single();
await logActivity({
  workspaceId:
    data.workspace_id,
  actionType:
    "UPDATE_NOTE",
  entityType:
    "NOTE",
  entityId:
    data.id,
  performedBy:
    updatedBy,
  metadata: {
    title,
  },
});
    if (error) {

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        { status: 400 }
      );

    }

    return NextResponse.json({
      success: true,
      note: data,
    });

  } catch (error) {

    console.error(
      "UPDATE NOTE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      { status: 500 }
    );

  }

}
export async function DELETE(
  req: Request
) {

  try {

    const {
      searchParams,
    } = new URL(req.url);

    const noteId =
      searchParams.get(
        "noteId"
      );

    if (!noteId) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Note ID Required",
        },
        { status: 400 }
      );

    }

    // Fetch Note First

    const {
      data: note,
      error: fetchError,
    } = await supabase
      .from(
        "workspace_notes"
      )
      .select("*")
      .eq(
        "id",
        noteId
      )
      .single();

    if (fetchError || !note) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Note Not Found",
        },
        { status: 404 }
      );

    }

    // Delete Note

    const { error } =
      await supabase
        .from(
          "workspace_notes"
        )
        .delete()
        .eq(
          "id",
          noteId
        );

    if (error) {

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        { status: 400 }
      );

    }

    // Log Activity

    await logActivity({

      workspaceId:
        note.workspace_id,

      actionType:
        "DELETE_NOTE",

      entityType:
        "NOTE",

      entityId:
        note.id,

      performedBy:
        "Founder",

      metadata: {
        title:
          note.title,
      },

    });

    return NextResponse.json({
      success: true,
      message:
        "Note Deleted",
    });

  } catch (error) {

    console.error(
      "DELETE NOTE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      { status: 500 }
    );

  }

}