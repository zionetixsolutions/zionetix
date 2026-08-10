import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { generateVentureId } from "@/lib/venture-id";

const RegisterSchema = z
  .object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    ventureName: z.string().min(2),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message:
        "Passwords do not match",
      path: [
        "confirmPassword",
      ],
    }
  );

export async function POST(
  req: Request
) {
  try {
    const formData = await req.formData();

const body = {
  fullName: formData.get("fullName"),
  email: formData.get("email"),
  password: formData.get("password"),
  confirmPassword: formData.get("confirmPassword"),
  ventureName: formData.get("ventureName"),
};

const profileImage = formData.get("profileImage") as File | null;
    const validation =
      RegisterSchema.safeParse(
        body
      );

    if (
      !validation.success
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]
              ?.message ||
            "Invalid Input",
        },
        {
          status: 400,
        }
      );
    }

    const {
      fullName,
      email,
      password,
      ventureName,
    } = validation.data;

    const {
      data,
      error,
    } =
      await supabaseAdmin.auth.signUp(
        {
          email,
          password,
        }
      );

    if (error) {
      console.error(
        "SUPABASE SIGNUP ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        {
          status: 400,
        }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User creation failed",
        },
        {
          status: 400,
        }
      );
    }


    let profileImageUrl = "";

if (profileImage && profileImage.size > 0) {
  const fileName = `${Date.now()}-${profileImage.name}`;

const { error: uploadError } = await supabaseAdmin.storage
  .from("profile-images")
  .upload(fileName, profileImage);
  if (!uploadError) {
    profileImageUrl = supabaseAdmin.storage
      .from("profile-images")
      .getPublicUrl(fileName).data.publicUrl;
  }
}
    const ventureId =
      generateVentureId();

    const {
      error:
        profileError,
    } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: data.user.id,
        full_name:
          fullName,
        email,
        role: "founder",
        profile_image: profileImageUrl,
      });

    if (
      profileError
    ) {
      console.error(
        "PROFILE ERROR:",
        profileError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to create profile",
        },
        {
          status: 500,
        }
      );
    }

    const {
      error:
        ventureError,
    } = await supabaseAdmin
      .from("ventures")
      .insert({
        venture_id:
          ventureId,
        venture_name:
          ventureName,
        founder_id:
          data.user.id,
      });

    if (
      ventureError
    ) {
      console.error(
        "VENTURE ERROR:",
        ventureError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to create venture",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Registration Successful",
      ventureId,
    });

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}