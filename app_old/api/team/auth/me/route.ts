import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const authHeader =
      req.headers.get("authorization");

    console.log("HEADER:", authHeader);

    if (!authHeader) {
      return NextResponse.json({
        success: false,
        message: "No token provided",
      });
    }

    const token =
      authHeader.replace("Bearer ", "");

    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    console.log("DECODED:", decoded);

    return NextResponse.json({
      success: true,
      decoded,
    });

  } catch (error) {
    console.error("JWT ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Invalid Token",
    });
  }
}