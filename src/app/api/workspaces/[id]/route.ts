import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// GET - Fetch single workspace
export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    console.log("WORKSPACE DETAIL ID:", id);

    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("id", id)
      .single();

    console.log("WORKSPACE DETAIL DATA:", data);
    console.log("WORKSPACE DETAIL ERROR:", error);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Workspace Detail API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch workspace",
      },
      { status: 500 }
    );
  }
}

// PATCH - Update workspace
export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const {
      workspace_name,
      workspace_description,
    } = body;

    if (!workspace_name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Workspace name is required",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("workspaces")
      .update({
        workspace_name: workspace_name.trim(),
        workspace_description:
          workspace_description?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Workspace PATCH Error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Workspace PATCH Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update workspace",
      },
      { status: 500 }
    );
  }
}