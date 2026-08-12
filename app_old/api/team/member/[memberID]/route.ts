import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ memberID: string }> }
) {
  try {
    const { memberID } = await params;
console.log("MEMBER ID:", memberID);
    const { data, error } =
      await supabase
        .from("team_members")
        .select("*")
        .eq("member_id", memberID);
        

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
      member: data,
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
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ memberID: string }> }
) {
  try {
    const { memberID } = await params;

    const body = await req.json();

    const { fullName, role } = body;

    const { data, error } = await supabase
      .from("team_members")
      .update({
        full_name: fullName,
        role,
      })
      .eq("member_id", memberID)
      .select();

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
      member: data,
      message: "Member Updated Successfully",
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
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ memberID: string }> }
) {
  try {
    const { memberID } = await params;

    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("member_id", memberID);

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
      message: "Member Deleted Successfully",
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
