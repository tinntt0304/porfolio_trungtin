import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("file").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const created = [];
  for (const file of files) {
    try {
      const saved = await saveUploadedFile(file);
      const image = await prisma.image.create({ data: saved });
      created.push(image);
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Upload failed" },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ images: created });
}
