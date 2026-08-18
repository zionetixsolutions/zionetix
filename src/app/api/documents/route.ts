import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function getFileExtension(fileName: string) {
  return (
    fileName.split(".").pop()?.toLowerCase() || ""
  );
}

function getMimeType(file: File) {
  if (file.type) {
    return file.type;
  }

  const extension =
    getFileExtension(file.name);

  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",

    doc: "application/msword",

    docx:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    xls: "application/vnd.ms-excel",

    xlsx:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    ppt: "application/vnd.ms-powerpoint",

    pptx:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    txt: "text/plain",

    csv: "text/csv",
  };

  return (
    mimeTypes[extension] ||
    "application/octet-stream"
  );
}

/* =========================================================
   UPLOAD DOCUMENT
========================================================= */

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file = formData.get("file");

    const workspaceId =
      formData.get("workspace_id");

    const uploadedBy =
      formData.get("uploaded_by");

    /* =====================================================
       VALIDATE FILE
    ===================================================== */

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No file selected",
        },
        { status: 400 }
      );
    }

    if (
      typeof workspaceId !== "string" ||
      !workspaceId
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Workspace ID is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       VALIDATE FILE NAME
    ===================================================== */

    const fileName =
      file.name?.trim();

    if (!fileName) {
      return NextResponse.json(
        {
          success: false,
          message: "File name is required",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       GET WORKSPACE
    ===================================================== */

    const {
      data: workspace,
      error: workspaceError,
    } = await supabase
      .from("workspaces")
      .select("id, venture_id")
      .eq("id", workspaceId)
      .single();

    if (
      workspaceError ||
      !workspace
    ) {
      console.error(
        "Workspace lookup error:",
        workspaceError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            workspaceError?.message ||
            "Workspace not found",
        },
        { status: 404 }
      );
    }

    /* =====================================================
       FILE INFORMATION
    ===================================================== */

    const fileType =
      getMimeType(file);

    const fileSize =
      file.size;

    /* =====================================================
       SAFE STORAGE FILE NAME
    ===================================================== */

    const safeFileName =
      fileName.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

    const uniqueFileName =
      `${Date.now()}-${crypto.randomUUID()}-${safeFileName}`;

    /*
      Important:
      Workspace-specific storage path
    */

    const storagePath =
      `workspaces/${workspaceId}/${uniqueFileName}`;

    /* =====================================================
       FILE → ARRAY BUFFER
    ===================================================== */

    const fileBuffer =
      await file.arrayBuffer();

    /* =====================================================
       UPLOAD TO SUPABASE STORAGE
    ===================================================== */

    const {
      error: uploadError,
    } = await supabase.storage
      .from("Documents")
      .upload(
        storagePath,
        fileBuffer,
        {
          contentType: fileType,
          upsert: false,
        }
      );

    if (uploadError) {
      console.error(
        "Document Storage Upload Error:",
        uploadError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            uploadError.message ||
            "Failed to upload file",
        },
        { status: 500 }
      );
    }

    /* =====================================================
       PUBLIC URL
    ===================================================== */

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("Documents")
      .getPublicUrl(
        storagePath
      );

    const fileUrl =
      publicUrlData.publicUrl;

    /* =====================================================
       DOCUMENT ID
    ===================================================== */

    const documentId =
      `DOC-${Math.floor(
        1000 +
          Math.random() * 9000
      )}`;

    /* =====================================================
       INSERT DOCUMENT
    ===================================================== */

    const {
      data: document,
      error: documentError,
    } = await supabase
      .from("document")
      .insert({
        document_id:
          documentId,

        /*
          IMPORTANT:
          Connect document to this
          particular workspace.
        */

        workspace_id:
          workspaceId,

        venture_id:
          workspace.venture_id,

        /*
          IMPORTANT:
          Save actual uploaded filename.
        */

        file_name:
          fileName,

        /*
          Keep title as well if
          your table has this column.
        */

        title:
          fileName,

        file_url:
          fileUrl,

        file_type:
          fileType,

        file_size:
          fileSize,

        uploaded_by:
          typeof uploadedBy ===
            "string" &&
          uploadedBy
            ? uploadedBy
            : null,
      })
      .select("*")
      .single();

    /* =====================================================
       DATABASE ERROR
    ===================================================== */

    if (documentError) {
      console.error(
        "Document Database Insert Error:",
        documentError
      );

      /*
        Remove uploaded file if
        database insert fails.
      */

      await supabase.storage
        .from("Documents")
        .remove([
          storagePath,
        ]);

      return NextResponse.json(
        {
          success: false,
          message:
            documentError.message ||
            "Failed to save document",
        },
        { status: 500 }
      );
    }

    /* =====================================================
       ACTIVITY LOG
    ===================================================== */

    const {
      error: activityError,
    } = await supabase
      .from("workspace_activity")
      .insert({
        workspace_id:
          workspaceId,

        action_type:
          "UPLOAD_FILE",

        entity_type:
          "DOCUMENT",

        entity_id:
          document.id,

        performed_by:
          typeof uploadedBy ===
            "string" &&
          uploadedBy
            ? uploadedBy
            : null,

        metadata: {
          fileName:
            fileName,

          fileType:
            fileType,

          fileSize:
            fileSize,
        },
      });

    if (activityError) {
      console.error(
        "Document Activity Error:",
        activityError
      );
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Document uploaded successfully",

        data: document,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Document Upload API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to upload document",
      },
      { status: 500 }
    );
  }
}