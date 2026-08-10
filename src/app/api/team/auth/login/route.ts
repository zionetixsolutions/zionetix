import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { memberId, password } =
      await req.json();

    const { data: member, error } =
      await supabase
        .from("team_members")
        .select("*")
        .eq("member_id", memberId)
        .single();

    if (error || !member) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Member ID",
        },
        { status: 400 }
      );
    }

    const validPassword =
      await bcrypt.compare(
        password,
        member.password_hash
      );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Password",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      member: {
        id: member.id,
        member_id: member.member_id,
        full_name: member.full_name,
        role: member.role,
        venture_id: member.venture_id,
      },
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