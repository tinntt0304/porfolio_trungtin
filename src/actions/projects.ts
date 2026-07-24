"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  repoUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  order: z.coerce.number().int(),
  coverImageId: z.string().nullable(),
});

function parseProjectForm(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "");

  return projectSchema.parse({
    title,
    slug: slugify(rawSlug.trim() || title),
    description: String(formData.get("description") ?? ""),
    repoUrl: String(formData.get("repoUrl") ?? "") || undefined,
    demoUrl: String(formData.get("demoUrl") ?? "") || undefined,
    order: formData.get("order") ?? 0,
    coverImageId: (formData.get("coverImageId") as string) || null,
  });
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const data = parseProjectForm(formData);
  await prisma.project.create({ data });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseProjectForm(formData);
  await prisma.project.update({ where: { id }, data });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
