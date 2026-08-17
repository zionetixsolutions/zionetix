import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.replace(/^Bearer\s+/i, "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ success: true, decoded });
  } catch (error) {
    console.error("TEAM AUTH ME ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Invalid Token" },
      { status: 401 }
    );
  }
}
