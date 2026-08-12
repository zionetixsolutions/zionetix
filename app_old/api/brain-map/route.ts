import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      ventureId,
      brainMapName,
      brainMapDescription,
      createdBy,
    } = body;

    const { data, error } =
      await supabase
        .from("brain_maps")
        .insert({
          venture_id: ventureId,
          brain_map_name: brainMapName,
          brain_map_description:
            brainMapDescription,
          created_by: createdBy,
        })
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
      brainMap: data,
    });

  } catch (error) {

    console.error(
      "BRAIN MAP CREATE ERROR:",
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

export async function GET() {
  try {

    const { data, error } =
      await supabase
        .from("brain_maps")
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
      brainMaps: data,
    });

  } catch (error) {

    console.error(
      "BRAIN MAP FETCH ERROR:",
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