import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

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

    const {
      email,
      venture_id,
      password,
    } = validation.data;

    // Supabase login
    const {
      data,
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }

    if (!data.user || !data.session) {
      return NextResponse.json(
        {
          success: false,
          message: "Login failed",
        },
        { status: 400 }
      );
    }

    // Get founder profile
    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      console.error(
        "PROFILE FETCH ERROR:",
        profileError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        { status: 404 }
      );
    }

    // Get venture
    const {
      data: venture,
      error: ventureError,
    } = await supabase
      .from("ventures")
      .select("*")
      .eq("founder_id", profile.id)
      .single();

    if (ventureError || !venture) {
      console.error(
        "VENTURE FETCH ERROR:",
        ventureError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Venture not found",
        },
        { status: 404 }
      );
    }

    // Verify Venture ID
    if (venture.venture_id !== venture_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Venture ID",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // STORE SUPABASE SESSION IN HTTP-ONLY COOKIES
    // -----------------------------------------

    const cookieStore = await cookies();

    cookieStore.set(
      "sb-access-token",
      data.session.access_token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      }
    );

    cookieStore.set(
      "sb-refresh-token",
      data.session.refresh_token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }
    );

    // -----------------------------------------
    // SUCCESS RESPONSE
    // -----------------------------------------

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

    console.error(
      "LOGIN ERROR:",
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