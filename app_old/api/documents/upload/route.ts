import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateDocumentId } from "@/lib/document-id";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const ventureId = formData.get("ventureId") as string;
    const file = formData.get("file") as File;
    const fileName = `${Date.now()}-${file.name}`;

const { error: uploadError } =
  await supabase.storage
    .from("Documents")
    .upload(fileName, file);

if (uploadError) {
  return NextResponse.json(
    {
      success: false,
      message: uploadError.message,
    },
    { status: 400 }
  );
}

const {
  data: { publicUrl },
} = supabase.storage
  .from("Documents")
  .getPublicUrl(fileName);

    if (!title || !ventureId || !file) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase
  .from("document")
  .insert({
    document_id: generateDocumentId(),
    venture_id: ventureId,
    title,
    file_url: publicUrl,
    uploaded_by: null,
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

    return NextResponse.json({
      success: true,
      message: "Document Added Successfully",
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