import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Workspace GET Error:", error);

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
      data: data ?? [],
    });
  } catch (error) {
    console.error("Workspace GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch workspaces",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      workspace_name,
      workspace_description,
      venture_id,
      created_by,
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

    if (!venture_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Venture ID is required",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("workspaces")
      .insert({
        workspace_name: workspace_name.trim(),
        workspace_description:
          workspace_description?.trim() || null,
        venture_id,
        created_by: created_by || "Founder",
      })
      .select()
      .single();

    if (error) {
      console.error("Workspace POST Error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Workspace POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create workspace",
      },
      { status: 500 }
    );
  }
}