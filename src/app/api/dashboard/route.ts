import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {

    const { data, error } = await supabase
      .from("workspaces")
      .select("*");

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

  } catch {

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
      },
      { status: 500 }
    );

  }
}