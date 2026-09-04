import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface RouteContext { params: Promise<{ id: string }>; }

function storagePathFromUrl(fileUrl: string | null) {
  const marker = "/storage/v1/object/public/Documents/";
  const index = fileUrl?.indexOf(marker) ?? -1;
  return index < 0 || !fileUrl ? null : decodeURIComponent(fileUrl.slice(index + marker.length));
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const { data: document, error } = await supabase.from("document").select("*").eq("document_id", id).single();
    if (error || !document) return NextResponse.json({ success: false, message: error?.message || "Document not found" }, { status: 404 });
    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error("Document detail GET Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch document" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const { data: document, error: findError } = await supabase.from("document").select("id, file_url").eq("document_id", id).single();
    if (findError || !document) return NextResponse.json({ success: false, message: findError?.message || "Document not found" }, { status: 404 });

    const storagePath = storagePathFromUrl(document.file_url);
    if (storagePath) {
      const { error: storageError } = await supabase.storage.from("Documents").remove([storagePath]);
      if (storageError) return NextResponse.json({ success: false, message: "Failed to delete the uploaded file" }, { status: 500 });
    }

    const { error: deleteError } = await supabase.from("document").delete().eq("id", document.id);
    if (deleteError) return NextResponse.json({ success: false, message: deleteError.message }, { status: 500 });
    return NextResponse.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.error("Document DELETE API Error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete document" }, { status: 500 });
  }
}
