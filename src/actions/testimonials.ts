"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { testimonials } from "@/db/schema";
import { testimonialFormSchema } from "@/lib/schemas/testimonial";
import { requireAdmin } from "@/lib/require-admin";

export async function createTestimonial(raw: unknown) {
  await requireAdmin();
  const data = testimonialFormSchema.parse(raw);
  const id = randomUUID();
  const now = new Date();
  await getDb().insert(testimonials).values({ id, ...data, createdAt: now });
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
}

export async function updateTestimonial(id: string, raw: unknown) {
  await requireAdmin();
  const data = testimonialFormSchema.parse(raw);
  await getDb().update(testimonials).set(data).where(eq(testimonials.id, id));
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await getDb().delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
}
