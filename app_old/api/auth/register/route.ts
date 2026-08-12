import { NextResponse } from "next/server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { generateVentureId } from "@/lib/venture-id";

console.log("========== REGISTER ROUTE LOADED ==========");
const RegisterSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  ventureName: z.string().min(2),
});

export async function POST(req: Request) {
   console.log("REGISTER API HIT");

  try {
    const formData = await req.formData();

const body = {
  fullName: formData.get("fullName"),
  email: formData.get("email"),
  password: formData.get("password"),
  ventureName: formData.get("ventureName"),
};

const profileImage = formData.get("profileImage") as File | null;

const validation = RegisterSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Input",
        },
        { status: 400 }
      );
    }

    const { fullName, email, password, ventureName } =
      validation.data;
console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "KEY EXISTS:",
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
  console.log("SUPABASE ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: error.message,
    },
    { status: 400 }
  );
}

    const ventureId = generateVentureId();

     let profileImageUrl = "";

if (profileImage && profileImage.size > 0) {

  const fileName =
    `${Date.now()}-${profileImage.name}`;

  const { error: uploadError } =
    await supabase.storage
      .from("profile-images")
      .upload(fileName, profileImage);

  if (!uploadError) {

    profileImageUrl =
      supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName)
        .data.publicUrl;

  }

}
   const profileResult = await supabase
  .from("profiles")
  .insert({
    id: data.user?.id,
    full_name: fullName,
    email,
    role: "founder",
    profile_image: profileImageUrl,
  });

console.log("PROFILE RESULT:", profileResult);

const ventureResult = await supabase
  .from("ventures")
  .insert({
    venture_id: ventureId,
    venture_name: ventureName,
    founder_id: data.user?.id,
  });

console.log("VENTURE RESULT:", ventureResult);

    return NextResponse.json({
      success: true,
      ventureId,
      message: "Registration Successful",
    });
  } catch (error) {
  console.error("REGISTER ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Server Error",
    },
    { status: 500 }
  );
}
}