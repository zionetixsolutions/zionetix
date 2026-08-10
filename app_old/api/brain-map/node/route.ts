import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      brainMapId,
      nodeTitle,
      nodeDescription,
      nodeType,
      createdBy,
    } = body;

    const { data, error } =
      await supabase
        .from("brain_map_nodes")
        .insert({
          brain_map_id: brainMapId,
          node_title: nodeTitle,
          node_description: nodeDescription,
          node_type: nodeType,
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
      node: data,
    });

  } catch (error) {

    console.error(
      "BRAIN MAP NODE CREATE ERROR:",
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

export async function GET(req: Request) {
  try {

    const { searchParams } =
      new URL(req.url);

    const brainMapId =
      searchParams.get("brainMapId");

    const { data, error } =
      await supabase
        .from("brain_map_nodes")
        .select("*")
        .eq(
          "brain_map_id",
          brainMapId
        )
        .order(
          "created_at",
          { ascending: false }
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
      nodes: data,
    });

  } catch (error) {

    console.error(
      "BRAIN MAP NODE FETCH ERROR:",
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

export async function PUT(req: Request) {
  try {

    const body = await req.json();

    const {
      nodeId,
      nodeTitle,
      nodeDescription,
      nodeType,
    } = body;

    const { data, error } =
      await supabase
        .from("brain_map_nodes")
        .update({
          node_title: nodeTitle,
          node_description: nodeDescription,
          node_type: nodeType,
          updated_at: new Date(),
        })
        .eq("id", nodeId)
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
      node: data,
    });

  } catch (error) {

    console.error(
      "BRAIN MAP NODE UPDATE ERROR:",
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

export async function DELETE(
  req: Request
) {
  try {

    const { searchParams } =
      new URL(req.url);

    const nodeId =
      searchParams.get("nodeId");

    const { error } =
      await supabase
        .from("brain_map_nodes")
        .delete()
        .eq("id", nodeId);

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
      message:
        "Node Deleted Successfully",
    });

  } catch (error) {

    console.error(
      "BRAIN MAP NODE DELETE ERROR:",
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