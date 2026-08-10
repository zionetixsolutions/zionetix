import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

function generateMemberId() {
  return `TM-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      password,
      role,
      ventureId,
    } = body;

    if (
      !fullName ||
      !email ||
      !password ||
      !role ||
      !ventureId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const memberId =
      generateMemberId();

    const passwordHash =
      await bcrypt.hash(password, 10);

    const { data, error } =
      await supabase
        .from("team_members")
        .insert([
          {
            member_id: memberId,
            full_name: fullName,
            email,
            password_hash:
              passwordHash,
            venture_id:
              ventureId,
            role,
          },
        ])
        .select()
        .single();

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
      memberId:
        data.member_id,
      message:
        "Member Created Successfully",
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