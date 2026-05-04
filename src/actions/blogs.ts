"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { blogs } from "@/db/schema";
import { blogFormSchema } from "@/lib/schemas/blog";
import { requireAdmin } from "@/lib/require-admin";

function normalizeBlog(raw: unknown) {
  const data = blogFormSchema.parse(raw);
  const publishedAt =
    data.publishedAt && data.publishedAt.trim() !== ""
      ? new Date(data.publishedAt)
      : null;
  const thumbnailUrl =
    data.thumbnailUrl && data.thumbnailUrl.trim() !== ""
      ? data.thumbnailUrl
      : null;
  return {
    slug: data.slug,
    titleId: data.titleId,
    titleEn: data.titleEn,
    contentId: data.contentId,
    contentEn: data.contentEn,
    thumbnailUrl,
    publishedAt,
  };
}

export async function createBlog(raw: unknown) {
  await requireAdmin();
  const v = normalizeBlog(raw);
  const id = randomUUID();
  const now = new Date();
  await getDb().insert(blogs).values({
    id,
    ...v,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${v.slug}`);
  revalidatePath("/");
}

export async function updateBlog(id: string, raw: unknown) {
  await requireAdmin();
  const v = normalizeBlog(raw);
  await getDb()
    .update(blogs)
    .set({ ...v, updatedAt: new Date() })
    .where(eq(blogs.id, id));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${v.slug}`);
  revalidatePath("/");
}

export async function deleteBlog(id: string) {
  await requireAdmin();
  await getDb().delete(blogs).where(eq(blogs.id, id));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
