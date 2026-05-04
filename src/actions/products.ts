"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { products } from "@/db/schema";
import { productFormSchema } from "@/lib/schemas/product";
import { requireAdmin } from "@/lib/require-admin";

export async function createProduct(raw: unknown) {
  await requireAdmin();
  const data = productFormSchema.parse(raw);
  const now = new Date();
  const id = randomUUID();
  await getDb().insert(products).values({
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  return { id };
}

export async function updateProduct(id: string, raw: unknown) {
  await requireAdmin();
  const data = productFormSchema.parse(raw);
  await getDb()
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  revalidatePath(`/products/${id}`);
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await getDb().delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
