import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: ventures, error } = await supabase
      .from("ventures")
      .select("*")
      .limit(1);

    if (error) {
      console.error("VENTURE API ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    if (!ventures || ventures.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No venture found",
        },
        { status: 404 }
      );
    }

    const venture = ventures[0];

    const { count: teamSize, error: teamError } =
      await supabase
        .from("team_members")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("venture_id", venture.id);

    if (teamError) {
      console.error(
        "TEAM COUNT ERROR:",
        teamError
      );
    }

    return NextResponse.json({
      success: true,
      venture: {
        ventureName: venture.venture_name,
        ventureId: venture.venture_id,
        createdAt: venture.created_at,
        teamSize: teamSize || 0,
      },
    });
  } catch (error) {
    console.error(
      "VENTURE API SERVER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch venture data",
      },
      { status: 500 }
    );
  }
}