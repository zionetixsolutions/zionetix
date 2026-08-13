import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const LoginSchema = z.object({
  email: z.string().email(),
  venture_id: z.string().min(1),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = LoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Input",
        },
        { status: 400 }
      );
    }

    const { email, venture_id, password } = validation.data;

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },

          setAll(cookiesToSet) {
            cookiesToSet.forEach(
              ({ name, value, options }) => {
                cookieStore.set(name, value, options);
              }
            );
          },
        },
      }
    );

    // LOGIN
    const {
      data,
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message || "Login failed",
        },
        { status: 400 }
      );
    }

    // PROFILE
    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    // VENTURE
    const {
      data: venture,
      error: ventureError,
    } = await supabase
      .from("ventures")
      .select("*")
      .eq("founder_id", profile.id)
      .single();

    if (ventureError || !venture) {
      return NextResponse.json(
        {
          success: false,
          message: "Venture not found",
        },
        { status: 404 }
      );
    }

    // CHECK VENTURE ID
    if (venture.venture_id !== venture_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Venture ID",
        },
        { status: 400 }
      );
    }

    // SUCCESS
    return NextResponse.json({
      success: true,

      user: {
        id: profile.id,
        full_name: profile.full_name,
        email: profile.email,
        role: profile.role,
      },

      venture: {
        id: venture.id,
        venture_id: venture.venture_id,
        venture_name: venture.venture_name,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}