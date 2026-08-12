import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("workspace_activity")
      .select(
        "id, action_type, entity_type, entity_id, performed_by, metadata, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(4);

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
      data: data ?? [],
    });
  } catch (error) {
    console.error("Activity API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch recent activity",
      },
      { status: 500 }
    );
  }
}