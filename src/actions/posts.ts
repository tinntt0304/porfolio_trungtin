"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  coverImageId: z.string().nullable(),
  tagNames: z.array(z.string()),
});

function parsePostForm(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const rawSlug = String(formData.get("slug") ?? "");
  const tagsRaw = String(formData.get("tags") ?? "");

  return postSchema.parse({
    title,
    slug: slugify(rawSlug.trim() || title),
    excerpt: String(formData.get("excerpt") ?? "") || undefined,
    content: String(formData.get("content") ?? ""),
    status: formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    coverImageId: (formData.get("coverImageId") as string) || null,
    tagNames: tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  });
}

async function upsertTags(tagNames: string[]) {
  const tags = [];
  for (const name of tagNames) {
    const slug = slugify(name);
    if (!slug) continue;
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
    tags.push(tag);
  }
  return tags;
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const data = parsePostForm(formData);
  const tags = await upsertTags(data.tagNames);

  await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      status: data.status,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      coverImageId: data.coverImageId,
      tags: { create: tags.map((tag) => ({ tagId: tag.id })) },
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const data = parsePostForm(formData);
  const tags = await upsertTags(data.tagNames);
  const existing = await prisma.post.findUniqueOrThrow({ where: { id } });

  await prisma.postTag.deleteMany({ where: { postId: id } });
  await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      status: data.status,
      publishedAt:
        data.status === "PUBLISHED" ? (existing.publishedAt ?? new Date()) : null,
      coverImageId: data.coverImageId,
      tags: { create: tags.map((tag) => ({ tagId: tag.id })) },
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}
