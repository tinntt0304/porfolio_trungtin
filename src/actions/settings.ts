"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string().min(1),
  email: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  resumeUrl: z.string().optional(),
  avatarId: z.string().nullable(),
});

export async function updateProfile(formData: FormData) {
  await requireAdmin();
  const data = profileSchema.parse({
    name: formData.get("name"),
    title: formData.get("title"),
    bio: formData.get("bio"),
    email: String(formData.get("email") ?? "") || undefined,
    github: String(formData.get("github") ?? "") || undefined,
    linkedin: String(formData.get("linkedin") ?? "") || undefined,
    twitter: String(formData.get("twitter") ?? "") || undefined,
    facebook: String(formData.get("facebook") ?? "") || undefined,
    resumeUrl: String(formData.get("resumeUrl") ?? "") || undefined,
    avatarId: (formData.get("avatarId") as string) || null,
  });

  await prisma.profile.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}

const skillSchema = z.object({
  name: z.string().min(1),
  level: z.coerce.number().int().min(1).max(5).nullable(),
  order: z.coerce.number().int(),
});

function parseSkillForm(formData: FormData) {
  const levelRaw = formData.get("level");
  return skillSchema.parse({
    name: formData.get("name"),
    level: levelRaw ? Number(levelRaw) : null,
    order: formData.get("order") ?? 0,
  });
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const data = parseSkillForm(formData);
  await prisma.skill.create({ data });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseSkillForm(formData);
  await prisma.skill.update({ where: { id }, data });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}
