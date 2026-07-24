"use server";

import { unlink } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function deleteImage(id: string) {
  await requireAdmin();

  const image = await prisma.image.findUnique({
    where: { id },
    include: { posts: true, projects: true, profiles: true },
  });
  if (!image) return;

  if (image.posts.length || image.projects.length || image.profiles.length) {
    throw new Error("Image is still in use and cannot be deleted");
  }

  await prisma.image.delete({ where: { id } });
  try {
    await unlink(path.join(process.cwd(), "public", "uploads", image.filename));
  } catch {
    // file already missing on disk; the DB row is the source of truth
  }

  revalidatePath("/admin/media");
}
