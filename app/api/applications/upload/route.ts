import { NextResponse } from "next/server";
import { uploadImage, cloudinary } from "@/lib/db/images";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "image/webp",
  "application/pdf",
]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 413 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPG, PNG, HEIC, WEBP, or PDF." },
      { status: 415 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    if (file.type === "application/pdf") {
      // Cloudinary "raw" upload for PDFs.
      const url = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "wolf-applications", resource_type: "raw" },
          (error, result) => {
            if (error || !result) return reject(error ?? new Error("Upload failed"));
            resolve(result.secure_url);
          },
        );
        stream.end(buffer);
      });
      return NextResponse.json({
        url,
        filename: file.name,
        contentType: file.type,
      });
    }

    const url = await uploadImage(buffer, "wolf-applications");
    return NextResponse.json({
      url,
      filename: file.name,
      contentType: file.type,
    });
  } catch (error) {
    console.error("Application upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
