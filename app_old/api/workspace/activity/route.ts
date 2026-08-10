import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request
) {

  const {
    searchParams,
  } = new URL(req.url);

  const workspaceId =
    searchParams.get(
      "workspaceId"
    );

  const { data, error } =
    await supabase
      .from(
        "workspace_activity"
      )
      .select("*")
      .eq(
        "workspace_id",
        workspaceId
      )
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
      },
      { status: 400 }
    );

  }

  return NextResponse.json({
    success: true,
    activities: data,
  });

}