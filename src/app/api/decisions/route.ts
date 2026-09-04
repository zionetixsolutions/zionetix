import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase-server";

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

const DecisionSchema = z.object({
  category: z.string().min(1, "Category is required"),

  title: z.string().min(1, "Title is required"),

  situation: z.string().optional().nullable(),

  recommendation: z.string().optional().nullable(),

  reasoning: z.array(z.unknown()).optional().default([]),

  risk_if_ignored: z.string().optional().nullable(),

  confidence_score: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional()
    .nullable(),

  status: z
    .enum([
      "PENDING",
      "ACCEPTED",
      "REJECTED",
      "PUSHBACK",
    ])
    .optional()
    .default("PENDING"),

  created_by: z
    .string()
    .optional()
    .default("AI"),
});

/*
|--------------------------------------------------------------------------
| GET /api/decisions
|--------------------------------------------------------------------------
|
| Returns all decisions belonging to the authenticated
| founder's venture.
|
*/

export async function GET() {
  try {
    /*
    |--------------------------------------------------------------------------
    | 1. Create authenticated Supabase client
    |--------------------------------------------------------------------------
    */

    const supabase =
      await createSupabaseServerClient();

    /*
    |--------------------------------------------------------------------------
    | 2. Get logged-in user
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
        {
          status: 401,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 3. Find founder's venture
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
        {
          status: 500,
        }
      );
    }

    if (!venture) {
      return NextResponse.json(
        {
          success: false,
          message: "Venture not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 4. Fetch decisions
    |--------------------------------------------------------------------------
    */

    const {
      data: decisions,
      error: decisionError,
    } = await supabase
      .from("decision_logs")
      .select(`
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
      `)
      .eq("venture_id", venture.id)
      .order("created_at", {
        ascending: false,
      });

    /*
    |--------------------------------------------------------------------------
    | 5. Handle database error
    |--------------------------------------------------------------------------
    */

    if (decisionError) {
      console.error(
        "Decision fetch error:",
        decisionError
      );

      return NextResponse.json(
        {
          success: false,
          message: decisionError.message,
        },
        {
          status: 500,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 6. Prepare Decision Inbox data
    |--------------------------------------------------------------------------
    */

    const formattedDecisions = (decisions ?? []).map(
      (decision) => ({
        id: decision.id,

        category:
          decision.category || "General",

        priority:
          decision.confidence_score !== null &&
          decision.confidence_score >= 80
            ? "High Priority"
            : "Standard Priority",

        status:
          decision.status || "PENDING",

        title:
          decision.title || "Untitled decision",

        description:
          decision.recommendation ||
          decision.situation ||
          "Decision submitted for leadership review.",

        situation:
          decision.situation,

        recommendation:
          decision.recommendation,

        reasoning:
          decision.reasoning ?? [],

        riskIfIgnored:
          decision.risk_if_ignored,

        confidenceScore:
          decision.confidence_score,

        createdBy:
          decision.created_by,

        createdAt:
          decision.created_at,

        updatedAt:
          decision.updated_at,
      })
    );

    /*
    |--------------------------------------------------------------------------
    | 7. Calculate statistics
    |--------------------------------------------------------------------------
    */

    const stats = {
      total: formattedDecisions.length,
      pending:
        formattedDecisions.filter(
          (decision) =>
            decision.status === "PENDING"
        ).length,

      accepted:
        formattedDecisions.filter(
          (decision) =>
            decision.status === "ACCEPTED"
        ).length,

      rejected:
        formattedDecisions.filter(
          (decision) =>
            decision.status === "REJECTED"
        ).length,

      pushback:
        formattedDecisions.filter(
          (decision) =>
            decision.status === "PUSHBACK"
        ).length,
    };

    /*
    |--------------------------------------------------------------------------
    | 8. Success response
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,
        data: formattedDecisions,
        stats,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    /*
    |--------------------------------------------------------------------------
    | Unexpected server error
    |--------------------------------------------------------------------------
    */

    console.error(
      "Decision GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch decisions",
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST /api/decisions
|--------------------------------------------------------------------------
|
| Creates a new Decision Inbox item for the authenticated
| founder's venture.
|
*/

export async function POST(
  request: NextRequest
) {
  try {
    /*
    |--------------------------------------------------------------------------
    | 1. Create authenticated Supabase client
    |--------------------------------------------------------------------------
    */

    const supabase =
      await createSupabaseServerClient();

    /*
    |--------------------------------------------------------------------------
    | 2. Get logged-in user
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
        {
          status: 401,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 3. Find founder's venture
    |--------------------------------------------------------------------------
    */

    const {
      data: venture,
      error: ventureError,
    } = await supabase
      .from("ventures")
      .select(
        "id, venture_id, venture_name"
      )
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
        {
          status: 500,
        }
      );
    }

    if (!venture) {
      return NextResponse.json(
        {
          success: false,
          message: "Venture not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 4. Read request body
    |--------------------------------------------------------------------------
    */

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON body",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 5. Validate request
    |--------------------------------------------------------------------------
    */

    const validation =
      DecisionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid decision data",
          errors:
            validation.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const decision =
      validation.data;

    /*
    |--------------------------------------------------------------------------
    | 6. Insert decision
    |--------------------------------------------------------------------------
    */

    const {
      data: createdDecision,
      error: insertError,
    } = await supabase
      .from("decision_logs")
      .insert({
        venture_id:
          venture.id,

        category:
          decision.category,

        title:
          decision.title,

        situation:
          decision.situation ?? null,

        recommendation:
          decision.recommendation ?? null,

        reasoning:
          decision.reasoning ?? [],

        risk_if_ignored:
          decision.risk_if_ignored ?? null,

        confidence_score:
          decision.confidence_score ?? null,

        status:
          decision.status ?? "PENDING",

        created_by:
          decision.created_by ?? "AI",
      })
      .select(`
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
      `)
      .single();

    /*
    |--------------------------------------------------------------------------
    | 7. Handle database error
    |--------------------------------------------------------------------------
    */

    if (insertError) {
      console.error(
        "Decision creation error:",
        insertError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            insertError.message,
        },
        {
          status: 500,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 8. Create activity history
    |--------------------------------------------------------------------------
    */

    const {
      data: activity,
      error: activityError,
    } = await supabase
      .from("decision_activity")
      .insert({
        decision_id:
          createdDecision.id,

        venture_id:
          venture.id,

        action: "CREATED",

        previous_status:
          null,

        new_status:
          createdDecision.status,

        comment:
          null,

        performed_by:
          user.id,

        performed_by_type:
          "AI",
      })
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
      .single();

    if (activityError) {
      console.error(
        "Decision creation activity error:",
        activityError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Decision created, but activity history could not be recorded",
          data:
            createdDecision,
        },
        {
          status: 500,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | 9. Success response
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,
        message:
          "Decision created successfully",
        data:
          createdDecision,
        activity,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    /*
    |--------------------------------------------------------------------------
    | Unexpected server error
    |--------------------------------------------------------------------------
    */

    console.error(
      "Decision POST error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create decision",
      },
      {
        status: 500,
      }
    );
  }
}