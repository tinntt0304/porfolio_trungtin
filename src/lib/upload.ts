import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { nanoid } from "nanoid";
import { slugify } from "@/lib/slug";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export interface SavedUpload {
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  width: number | null;
  height: number | null;
}

export async function saveUploadedFile(file: File): Promise<SavedUpload> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("File exceeds maximum size of 5MB");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = MIME_TO_EXT[file.type];
  const originalBase = file.name.replace(/\.[^/.]+$/, "");
  const baseSlug = slugify(originalBase) || "image";
  const filename = `${baseSlug}-${nanoid(8)}.${ext}`;

  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  let width: number | null = null;
  let height: number | null = null;
  try {
    const metadata = await sharp(buffer).metadata();
    width = metadata.width ?? null;
    height = metadata.height ?? null;
  } catch {
    // dimensions are best-effort; upload still succeeds without them
  }

  return {
    filename,
    url: `/uploads/${filename}`,
    size: file.size,
    mimeType: file.type,
    width,
    height,
  };
}
