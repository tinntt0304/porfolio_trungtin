"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const menuItemSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "Href is required"),
  order: z.coerce.number().int(),
  isVisible: z.boolean(),
  parentId: z.string().nullable(),
});

function parseMenuForm(formData: FormData) {
  return menuItemSchema.parse({
    label: formData.get("label"),
    href: formData.get("href"),
    order: formData.get("order") ?? 0,
    isVisible: formData.get("isVisible") === "on",
    parentId: formData.get("parentId") || null,
  });
}

export async function createMenuItem(formData: FormData) {
  await requireAdmin();
  const data = parseMenuForm(formData);
  await prisma.menuItem.create({ data });
  revalidatePath("/admin/menu");
  revalidatePath("/");
}

export async function updateMenuItem(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseMenuForm(formData);
  if (data.parentId === id) {
    throw new Error("A menu item cannot be its own parent");
  }
  await prisma.menuItem.update({ where: { id }, data });
  revalidatePath("/admin/menu");
  revalidatePath("/");
}

export async function deleteMenuItem(id: string) {
  await requireAdmin();
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/menu");
  revalidatePath("/");
}
