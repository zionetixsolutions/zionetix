import { NextResponse } from "next/server";
import { getFounderContext } from "@/lib/team-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ventureID: string }> }
) {
  try {
    const { ventureID } = await params;
    const context = await getFounderContext();

    if (!context) {
      return NextResponse.json(
        { success: false, message: "Founder session not found" },
        { status: 401 }
      );
    }

    if (context.ventureId !== ventureID) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { data, error } = await context.supabase
      .from("team_members")
      .select("*")
      .eq("venture_id", ventureID);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, members: data });
  } catch (error) {
    console.error("TEAM MEMBERS BY VENTURE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
