import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const DECISION_COLUMNS = `
  id,
  venture_id,
  category,
  title,
  situation,
  recommendation,
  reasoning,
  risk_if_ignored,
  confidence_score,
  status,
  created_by,
  created_at,
  updated_at
`;

const VALID_STATUSES = [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "PUSHBACK",
] as const;

type DecisionStatus = (typeof VALID_STATUSES)[number];

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/*
|--------------------------------------------------------------------------
| GET /api/decisions/[id]
|--------------------------------------------------------------------------
|
| Fetch one decision belonging to the authenticated founder's venture.
|
*/

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    /*
    |--------------------------------------------------------------------------
    | 1. Create authenticated Supabase client
    |--------------------------------------------------------------------------
    */

    const supabase = await createSupabaseServerClient();

    /*
    |--------------------------------------------------------------------------
    | 2. Authenticate user
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
    | 3. Find user's venture
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
        "Decision venture lookup error:",
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
    | 4. Get decision ID
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
    | 5. Fetch decision
    |--------------------------------------------------------------------------
    */

    const {
      data: decision,
      error: decisionError,
    } = await supabase
      .from("decision_logs")
      .select(DECISION_COLUMNS)
      .eq("id", id)
      .eq("venture_id", venture.id)
      .maybeSingle();

    if (decisionError) {
      console.error(
        "Decision details error:",
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
    | 6. Return decision
    |--------------------------------------------------------------------------
    */

    return NextResponse.json({
      success: true,
      data: decision,
    });
  } catch (error) {
    console.error(
      "Decision GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch decision",
      },
      { status: 500 }
    );
  }
}

/*
|--------------------------------------------------------------------------
| PATCH /api/decisions/[id]
|--------------------------------------------------------------------------
|
| Update decision status through PostgreSQL RPC.
|
| The RPC performs:
|
|   1. Authentication validation
|   2. Venture ownership validation
|   3. Decision lookup
|   4. Decision update
|   5. Activity creation
|
| This keeps the status change and audit record in one
| database transaction.
|
*/

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    /*
    |--------------------------------------------------------------------------
    | 1. Create authenticated Supabase client
    |--------------------------------------------------------------------------
    */

    const supabase = await createSupabaseServerClient();

    /*
    |--------------------------------------------------------------------------
    | 2. Authenticate user
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
    | 3. Find user's venture
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
        "Decision venture lookup error:",
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
    | 4. Get decision ID
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
    | 5. Parse request body
    |--------------------------------------------------------------------------
    */

    let body: {
      status?: unknown;
      comment?: unknown;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON body",
        },
        { status: 400 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 6. Validate status
    |--------------------------------------------------------------------------
    */

    if (
      typeof body.status !== "string" ||
      !VALID_STATUSES.includes(
        body.status as DecisionStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid decision status. Allowed statuses: PENDING, ACCEPTED, REJECTED, PUSHBACK",
        },
        { status: 400 }
      );
    }

    const status =
      body.status as DecisionStatus;

    /*
    |--------------------------------------------------------------------------
    | 7. Validate comment
    |--------------------------------------------------------------------------
    */

    let comment: string | null = null;

    if (body.comment !== undefined) {
      if (typeof body.comment !== "string") {
        return NextResponse.json(
          {
            success: false,
            message: "Comment must be a string",
          },
          { status: 400 }
        );
      }

      comment = body.comment.trim();

      if (comment.length > 5000) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Comment must be 5000 characters or less",
          },
          { status: 400 }
        );
      }

      if (comment.length === 0) {
        comment = null;
      }
    }

    /*
    |--------------------------------------------------------------------------
    | 8. Execute transactional RPC
    |--------------------------------------------------------------------------
    */

    const {
      data: rpcResult,
      error: rpcError,
    } = await supabase.rpc(
      "update_decision_status",
      {
        p_decision_id: id,
        p_venture_id: venture.id,
        p_user_id: user.id,
        p_status: status,
        p_comment: comment,
      }
    );

    if (rpcError) {
      console.error(
        "Decision status RPC error:",
        rpcError
      );

      const errorMessage =
        rpcError.message || "";

      /*
      |--------------------------------------------------------------------------
      | Database-level errors
      |--------------------------------------------------------------------------
      */

      if (
        errorMessage.includes(
          "Not authenticated"
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Not authenticated",
          },
          { status: 401 }
        );
      }

      if (
        errorMessage.includes(
          "Unauthorized user"
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 403 }
        );
      }

      if (
        errorMessage.includes(
          "Unauthorized venture"
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 403 }
        );
      }

      if (
        errorMessage.includes(
          "Decision not found"
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Decision not found",
          },
          { status: 404 }
        );
      }

      if (
        errorMessage.includes(
          "Invalid decision status"
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid decision status",
          },
          { status: 400 }
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Unknown database error
      |--------------------------------------------------------------------------
      */

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to update decision",
        },
        { status: 500 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 9. Fetch updated decision
    |--------------------------------------------------------------------------
    */

    const {
      data: updatedDecision,
      error: updatedDecisionError,
    } = await supabase
      .from("decision_logs")
      .select(DECISION_COLUMNS)
      .eq("id", id)
      .eq("venture_id", venture.id)
      .maybeSingle();

    if (updatedDecisionError) {
      console.error(
        "Updated decision fetch error:",
        updatedDecisionError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Decision updated but could not be fetched",
        },
        { status: 500 }
      );
    }

    if (!updatedDecision) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Decision updated but could not be fetched",
        },
        { status: 500 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 10. Return successful response
    |--------------------------------------------------------------------------
    */

    return NextResponse.json({
      success: true,
      message:
        "Decision updated successfully",
      data: updatedDecision,
      activity: rpcResult,
    });
  } catch (error) {
    console.error(
      "Decision PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update decision",
      },
      { status: 500 }
    );
  }
}

/*
|--------------------------------------------------------------------------
| DELETE /api/decisions/[id]
|--------------------------------------------------------------------------
|
| Delete one decision belonging to the authenticated
| founder's venture.
|
| decision_activity is automatically deleted because
| decision_activity.decision_id references decision_logs.id
| with ON DELETE CASCADE.
|
*/

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    /*
    |--------------------------------------------------------------------------
    | 1. Create authenticated Supabase client
    |--------------------------------------------------------------------------
    */

    const supabase = await createSupabaseServerClient();

    /*
    |--------------------------------------------------------------------------
    | 2. Authenticate user
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
    | 3. Find user's venture
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
        "Decision venture lookup error:",
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
    | 4. Get decision ID
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
    | 5. Delete decision
    |--------------------------------------------------------------------------
    */

    const {
      data: deletedDecision,
      error: deleteError,
    } = await supabase
      .from("decision_logs")
      .delete()
      .eq("id", id)
      .eq("venture_id", venture.id)
      .select("id")
      .maybeSingle();

    if (deleteError) {
      console.error(
        "Decision delete error:",
        deleteError
      );

      return NextResponse.json(
        {
          success: false,
          message: deleteError.message,
        },
        { status: 500 }
      );
    }

    if (!deletedDecision) {
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
    | 6. Return success
    |--------------------------------------------------------------------------
    */

    return NextResponse.json({
      success: true,
      message:
        "Decision deleted successfully",
      data: {
        id: deletedDecision.id,
      },
    });
  } catch (error) {
    console.error(
      "Decision DELETE error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete decision",
      },
      { status: 500 }
    );
  }
}