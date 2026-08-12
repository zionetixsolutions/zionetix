import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    // 1. Get logged-in Supabase user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("DECISION USER:", user);

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Not logged in",
        },
        { status: 401 }
      );
    }

    // 2. Get founder profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    // 3. Get founder's venture
    const { data: venture, error: ventureError } = await supabase
      .from("ventures")
      .select("id, venture_id, venture_name")
      .eq("founder_id", profile.id)
      .single();

    console.log("DECISION VENTURE:", venture);

    if (ventureError || !venture) {
      return NextResponse.json(
        {
          success: false,
          message: "Venture not found",
        },
        { status: 404 }
      );
    }

    // 4. Get pending decisions for this venture
    const { data, error } = await supabase
      .from("decision_logs")
      .select(`
        id,
        category,
        title,
        status,
        confidence_score,
        created_at
      `)
      .eq("venture_id", venture.id)
      .eq("status", "PENDING")
      .order("created_at", {
        ascending: false,
      })
      .limit(3);

    console.log("DECISIONS:", data);
    console.log("DECISION ERROR:", error);

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
      data: data ?? [],
    });
  } catch (error) {
    console.error("Decision API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch decisions",
      },
      { status: 500 }
    );
  }
}