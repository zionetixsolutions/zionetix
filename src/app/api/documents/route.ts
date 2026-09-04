import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get("workspace_id");
    let query = supabase.from("document").select("*").order("created_at", { ascending: false });
    if (workspaceId) query = query.eq("workspace_id", workspaceId);
    const { data: documents, error } = await query;
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    return NextResponse.json({ success: true, documents: documents ?? [] });
  } catch (error) {
    console.error("Document GET API Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch documents" }, { status: 500 });
  }
}

function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function getMimeType(file: File) {
  if (file.type) return file.type;
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf", doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain", csv: "text/csv",
  };
  return mimeTypes[getFileExtension(file.name)] || "application/octet-stream";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const workspaceId = formData.get("workspace_id");
    const uploadedBy = formData.get("uploaded_by");

    if (!(file instanceof File)) return NextResponse.json({ success: false, message: "No file selected" }, { status: 400 });
    if (typeof workspaceId !== "string" || !workspaceId) return NextResponse.json({ success: false, message: "Workspace ID is required" }, { status: 400 });

    const fileName = file.name?.trim();
    if (!fileName) return NextResponse.json({ success: false, message: "File name is required" }, { status: 400 });

    const { data: workspace, error: workspaceError } = await supabase.from("workspaces").select("id, venture_id").eq("id", workspaceId).single();
    if (workspaceError || !workspace) return NextResponse.json({ success: false, message: workspaceError?.message || "Workspace not found" }, { status: 404 });

    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `workspaces/${workspaceId}/${Date.now()}-${crypto.randomUUID()}-${safeFileName}`;
    const fileType = getMimeType(file);
    const { error: uploadError } = await supabase.storage.from("Documents").upload(storagePath, await file.arrayBuffer(), { contentType: fileType, upsert: false });
    if (uploadError) return NextResponse.json({ success: false, message: uploadError.message || "Failed to upload file" }, { status: 500 });

    const { data: publicUrlData } = supabase.storage.from("Documents").getPublicUrl(storagePath);
    const { data: document, error: documentError } = await supabase.from("document").insert({
      document_id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      workspace_id: workspaceId, venture_id: workspace.venture_id,
      file_name: fileName, title: fileName, file_url: publicUrlData.publicUrl,
      file_type: fileType, file_size: file.size,
      uploaded_by: typeof uploadedBy === "string" && uploadedBy ? uploadedBy : null,
    }).select("*").single();

    if (documentError) {
      await supabase.storage.from("Documents").remove([storagePath]);
      return NextResponse.json({ success: false, message: documentError.message || "Failed to save document" }, { status: 500 });
    }

    const { error: activityError } = await supabase.from("workspace_activity").insert({
      workspace_id: workspaceId, action_type: "UPLOAD_FILE", entity_type: "DOCUMENT",
      entity_id: document.id, performed_by: typeof uploadedBy === "string" && uploadedBy ? uploadedBy : null,
      metadata: { fileName, fileType, fileSize: file.size },
    });
    if (activityError) console.error("Document Activity Error:", activityError);

    return NextResponse.json({ success: true, message: "Document uploaded successfully", data: document }, { status: 201 });
  } catch (error) {
    console.error("Document Upload API Error:", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Failed to upload document" }, { status: 500 });
  }
}
