"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { gallery } from "@/db/schema";
import { galleryFormSchema } from "@/lib/schemas/gallery";
import { requireAdmin } from "@/lib/require-admin";

export async function createGalleryItem(raw: unknown) {
  await requireAdmin();
  const data = galleryFormSchema.parse(raw);
  const id = randomUUID();
  const now = new Date();
  await getDb().insert(gallery).values({ id, ...data, createdAt: now });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function updateGalleryItem(id: string, raw: unknown) {
  await requireAdmin();
  const data = galleryFormSchema.parse(raw);
  await getDb().update(gallery).set(data).where(eq(gallery.id, id));
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function deleteGalleryItem(id: string) {
  await requireAdmin();
  await getDb().delete(gallery).where(eq(gallery.id, id));
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}
