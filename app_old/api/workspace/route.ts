import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {

  const { data, error } =
    await supabase
      .from("workspaces")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      }
    );

  }

  return NextResponse.json({
    success: true,
    workspaces: data,
  });

}