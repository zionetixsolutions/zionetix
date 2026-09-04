import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    // 1. Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Not logged in",
        },
        { status: 401 }
      );
    }

    // 2. Get user's profile
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

    // 3. Get user's venture
    const { data: venture, error: ventureError } = await supabase
      .from("ventures")
      .select("id, venture_id, venture_name")
      .eq("founder_id", profile.id)
      .single();

    if (ventureError || !venture) {
      return NextResponse.json(
        {
          success: false,
          message: "Venture not found",
        },
        { status: 404 }
      );
    }

    // 4. Get latest documents for this venture
    const { data, error } = await supabase
      .from("document")
      .select(`
        id,
        document_id,
        venture_id,
        title,
        file_url,
        uploaded_by,
        created_at
      `)
      .eq("venture_id", venture.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(3);

    console.log("DOCUMENTS:", data);
    console.log("DOCUMENT ERROR:", error);

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
    console.error("Documents API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch documents",
      },
      { status: 500 }
    );
  }
}