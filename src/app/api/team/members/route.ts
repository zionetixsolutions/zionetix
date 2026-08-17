import { NextResponse } from "next/server";
import { getFounderContext } from "@/lib/team-auth";
import bcrypt from "bcryptjs";

function generateMemberId() {
  return `TM-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function GET() {
  try {
    const context = await getFounderContext();

    if (!context) {
      return NextResponse.json(
        { success: false, message: "Founder session not found" },
        { status: 401 }
      );
    }

    const { ventureId, supabase } = context;

    const { data: members, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("venture_id", ventureId);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error("TEAM MEMBERS GET ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const context = await getFounderContext();

    if (!context) {
      return NextResponse.json(
        { success: false, message: "Founder session not found" },
        { status: 401 }
      );
    }

    const { ventureId, supabase } = context;

    const { fullName, email, password, role } = await req.json();

    if (!fullName || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("team_members")
      .insert({
        member_id: generateMemberId(),
        full_name: fullName,
        email,
        password_hash: passwordHash,
        venture_id: ventureId,
        role,
      })
      .select("member_id")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      memberId: data.member_id,
      message: "Member Created Successfully",
    });
  } catch (error) {
    console.error("TEAM MEMBER POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
