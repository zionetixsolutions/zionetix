import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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