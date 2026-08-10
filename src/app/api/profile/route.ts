import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Not logged in",
    });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, email, profile_image")
    .eq("id", user.id)
    .single();

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }

  return NextResponse.json({
    success: true,
    profile: data,
  });
}