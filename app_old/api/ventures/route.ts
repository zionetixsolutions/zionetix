import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {

  try {

    const { data, error } =
      await supabase
        .from("ventures")
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
          message: error.message,
        },
        { status: 400 }
      );

    }

    return NextResponse.json({
      success: true,
      ventures: data,
    });

  } catch (error) {

    console.error(
      "VENTURE FETCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );

  }

}