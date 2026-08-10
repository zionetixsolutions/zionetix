import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      workspaceId: string;
    }>;
  }
) {

  try {

    const {
      workspaceId,
    } = await params;

    const { data, error } =
      await supabase
        .from("workspaces")
        .select("*")
        .eq(
          "id",
          workspaceId
        )
        .single();

    if (error) {

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        { status: 400 }
      );

    }

    return NextResponse.json({
      success: true,
      workspace: data,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      { status: 500 }
    );

  }

}