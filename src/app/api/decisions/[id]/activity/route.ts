import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const supabase = await createSupabaseServerClient();

    /*
    |--------------------------------------------------------------------------
    | 1. Authenticate founder
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | 2. Find founder's venture
    |--------------------------------------------------------------------------
    */

    const {
      data: venture,
      error: ventureError,
    } = await supabase
      .from("ventures")
      .select("id")
      .eq("founder_id", user.id)
      .maybeSingle();

    if (ventureError) {
      console.error(
        "Decision activity venture lookup error:",
        ventureError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Failed to find venture",
        },
        { status: 500 }
      );
    }

    if (!venture) {
      return NextResponse.json(
        {
          success: false,
          message: "Venture not found",
        },
        { status: 404 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 3. Get decision ID
    |--------------------------------------------------------------------------
    */

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Decision ID is required",
        },
        { status: 400 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 4. Verify decision belongs to founder's venture
    |--------------------------------------------------------------------------
    */

    const {
      data: decision,
      error: decisionError,
    } = await supabase
      .from("decision_logs")
      .select("id")
      .eq("id", id)
      .eq("venture_id", venture.id)
      .maybeSingle();

    if (decisionError) {
      console.error(
        "Decision verification error:",
        decisionError
      );

      return NextResponse.json(
        {
          success: false,
          message: decisionError.message,
        },
        { status: 500 }
      );
    }

    if (!decision) {
      return NextResponse.json(
        {
          success: false,
          message: "Decision not found",
        },
        { status: 404 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 5. Fetch activity history
    |--------------------------------------------------------------------------
    */

    const {
      data: activities,
      error: activityError,
    } = await supabase
      .from("decision_activity")
      .select(`
        id,
        decision_id,
        venture_id,
        action,
        previous_status,
        new_status,
        comment,
        performed_by,
        performed_by_type,
        created_at
      `)
      .eq("decision_id", decision.id)
      .eq("venture_id", venture.id)
      .order("created_at", {
        ascending: false,
      });

    if (activityError) {
      console.error(
        "Decision activity fetch error:",
        activityError
      );

      return NextResponse.json(
        {
          success: false,
          message: activityError.message,
        },
        { status: 500 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 6. Return activity history
    |--------------------------------------------------------------------------
    */

    return NextResponse.json({
      success: true,
      data: activities ?? [],
      count: activities?.length ?? 0,
    });
  } catch (error) {
    console.error(
      "Decision activity GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch decision activity",
      },
      { status: 500 }
    );
  }
}