import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ventureID: string }> }
) {
  try {
    const { ventureID } = await params;

    console.log("VENTURE ID:", ventureID);

    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("venture_id", ventureID);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      members: data,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}