import { NextResponse } from "next/server";
import { getFounderContext } from "@/lib/team-auth";

type RouteContext = {
  params: Promise<{ memberID: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const context = await getFounderContext();
    const { memberID } = await params;

    if (!context) {
      return NextResponse.json(
        { success: false, message: "Founder session not found" },
        { status: 401 }
      );
    }

    const { ventureId, supabase } = context;

    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("member_id", memberID)
      .eq("venture_id", ventureId)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, member: data });
  } catch (error) {
    console.error("TEAM MEMBER GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const context = await getFounderContext();
    const { memberID } = await params;
    const { fullName, role } = await req.json();

    if (!context) {
      return NextResponse.json(
        { success: false, message: "Founder session not found" },
        { status: 401 }
      );
    }

    const { ventureId, supabase } = context;

    if (!fullName || !role) {
      return NextResponse.json(
        { success: false, message: "Name and role are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("team_members")
      .update({ full_name: fullName, role })
      .eq("member_id", memberID)
      .eq("venture_id", ventureId)
      .select("*");

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    if (!data.length) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      member: data[0],
      message: "Member Updated Successfully",
    });
  } catch (error) {
    console.error("TEAM MEMBER PUT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const context = await getFounderContext();
    const { memberID } = await params;

    if (!context) {
      return NextResponse.json(
        { success: false, message: "Founder session not found" },
        { status: 401 }
      );
    }

    const { ventureId, supabase } = context;

    const { data, error } = await supabase
      .from("team_members")
      .delete()
      .eq("member_id", memberID)
      .eq("venture_id", ventureId)
      .select("member_id");

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    if (!data.length) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Member Deleted Successfully",
    });
  } catch (error) {
    console.error("TEAM MEMBER DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
