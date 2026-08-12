import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json();

    const {
      ventureId,
      workspaceName,
      workspaceDescription,
      createdBy,
    } = body;

    const { data, error } =
      await supabase
        .from("workspaces")
        .insert({
          venture_id: ventureId,
          workspace_name:
            workspaceName,
          workspace_description:
            workspaceDescription,
          created_by:
            createdBy,
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

    return NextResponse.json({
      success: true,
      workspace: data,
    });

  } catch (error) {

    console.error(
      "WORKSPACE CREATE ERROR:",
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