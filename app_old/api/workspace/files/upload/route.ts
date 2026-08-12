import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: Request
) {

  try {

    const formData =
      await req.formData();

    const file =
      formData.get(
        "file"
      ) as File;

    if (!file) {

      return NextResponse.json(
        {
          success: false,
          message:
            "File Required",
        },
        { status: 400 }
      );

    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const fileName =
      `${Date.now()}-${file.name}`;

    const { error } =
      await supabase.storage
        .from(
          "workspace-files"
        )
        .upload(
          fileName,
          buffer,
          {
            contentType:
              file.type,
          }
        );

    if (error) {

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        { status: 400 }
      );

    }

    const { data } =
      supabase.storage
        .from(
          "workspace-files"
        )
        .getPublicUrl(
          fileName
        );

    return NextResponse.json({
      success: true,
      fileUrl:
        data.publicUrl,
      fileName,
      fileType:
        file.type,
      fileSize:
        file.size,
    });

  } catch (error) {

    console.error(
      "FILE UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      { status: 500 }
    );

  }

}