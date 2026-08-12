import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { logActivity } from "@/lib/activity";
export async function GET(
  req: Request
) {

  try {

    const {
      searchParams,
    } = new URL(req.url);

    const workspaceId =
      searchParams.get(
        "workspaceId"
      );

    const { data, error } =
      await supabase
        .from(
          "workspace_files"
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
      files: data,
    });

  } catch (error) {

    console.error(
      "GET FILES ERROR:",
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
export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      workspaceId,
      fileName,
      fileUrl,
      fileType,
      fileSize,
      uploadedBy,
    } = body;

    const { data, error } =
      await supabase
        .from(
          "workspace_files"
        )
        .insert({
          workspace_id:
            workspaceId,
          file_name:
            fileName,
          file_url:
            fileUrl,
          file_type:
            fileType,
          file_size:
            fileSize,
          uploaded_by:
            uploadedBy,
        })
        .select()
        .single();

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

    await logActivity({

      workspaceId,

      actionType:
        "UPLOAD_FILE",

      entityType:
        "FILE",

      entityId:
        data.id,

      performedBy:
        uploadedBy,

      metadata: {
        fileName,
      },

    });

    return NextResponse.json({
      success: true,
      file: data,
    });

  } catch (error) {

    console.error(
      "UPLOAD FILE ERROR:",
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

    const fileId =
      searchParams.get(
        "fileId"
      );

    if (!fileId) {

      return NextResponse.json(
        {
          success: false,
          message:
            "File ID required",
        },
        { status: 400 }
      );

    }

    const {
      data: file,
      error: fetchError,
    } = await supabase
      .from(
        "workspace_files"
      )
      .select("*")
      .eq(
        "id",
        fileId
      )
      .single();

    if (
      fetchError ||
      !file
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "File not found",
        },
        { status: 404 }
      );

    }

    const filePath =
      decodeURIComponent(
        file.file_url
          .split(
            "/workspace-files/"
          )[1]
      );

    await supabase.storage
      .from(
        "workspace-files"
      )
      .remove([
        filePath,
      ]);

    const {
      error,
    } = await supabase
      .from(
        "workspace_files"
      )
      .delete()
      .eq(
        "id",
        fileId
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

    await logActivity({

      workspaceId:
        file.workspace_id,

      actionType:
        "DELETE_FILE",

      entityType:
        "FILE",

      entityId:
        file.id,

      performedBy:
        file.uploaded_by,

      metadata: {
        fileName:
          file.file_name,
      },

    });

    return NextResponse.json({
      success: true,
      message:
        "File Deleted",
    });

  } catch (error) {

    console.error(
      "DELETE FILE ERROR:",
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