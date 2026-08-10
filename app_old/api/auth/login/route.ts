import { NextResponse } from "next/server";
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

    const { email,venture_id,password } = validation.data;

    const { data, error } =
      await supabase.auth.signInWithPassword({
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

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();
    const { data: venture } = await supabase
       .from("ventures")
       .select("*")
       .eq("founder_id", profile?.id)
       .single();

       if (venture?.venture_id !== venture_id) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid Venture ID",
    },
    { status: 400 }
  );
}

    return NextResponse.json({
  success: true,

  user: {
    id: profile?.id,
    full_name: profile?.full_name,
    email: profile?.email,
    role: profile?.role,
  },

  venture: {
    id: venture?.id,
    venture_id: venture?.venture_id,
    venture_name: venture?.venture_name,
  },

  accessToken: data.session?.access_token,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}