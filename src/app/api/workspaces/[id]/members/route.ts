import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function generateMemberId() {
  return `TM-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id: workspaceId } =
      await params;

    const body = await request.json();

    const fullName =
      body.full_name?.trim();

    const email =
      body.email?.trim().toLowerCase();

    const role =
      body.role?.trim() || "member";

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       GET WORKSPACE
    ===================================================== */

    const {
      data: workspace,
      error: workspaceError,
    } = await supabase
      .from("workspaces")
      .select("id, venture_id")
      .eq("id", workspaceId)
      .single();

    if (
      workspaceError ||
      !workspace
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Workspace not found",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       CHECK EXISTING MEMBER
    ===================================================== */

    const {
      data: existingMember,
      error: existingMemberError,
    } = await supabase
      .from("team_members")
      .select("id")
      .eq("venture_id", workspace.venture_id)
      .eq("email", email)
      .maybeSingle();

    if (existingMemberError) {
      console.error(
        "Existing member check error:",
        existingMemberError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to check existing member",
        },
        { status: 500 }
      );
    }

    if (existingMember) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This email is already a team member",
        },
        { status: 409 }
      );
    }

    /* =====================================================
       CREATE MEMBER
    ===================================================== */

    const memberId =
      generateMemberId();

    /*
      NOTE:
      This is only a temporary placeholder.
      Do NOT use a real user's password here.

      Later we should replace this with a proper
      invite-token / authentication flow.
    */

    const temporaryPasswordHash =
      "$2b$10$placeholder";

    const {
      data: member,
      error: memberError,
    } = await supabase
      .from("team_members")
      .insert({
        member_id: memberId,
        full_name: fullName,
        email,
        password_hash:
          temporaryPasswordHash,
        venture_id:
          workspace.venture_id,
        role,
      })
      .select(
        `
          id,
          member_id,
          full_name,
          email,
          venture_id,
          role,
          created_at
        `
      )
      .single();

    if (memberError) {
      console.error(
        "Create team member error:",
        memberError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            memberError.message ||
            "Failed to create team member",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Team member added successfully",
        data: member,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Invite member API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to add team member",
      },
      { status: 500 }
    );
  }
}