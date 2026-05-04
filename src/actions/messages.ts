"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { messages } from "@/db/schema";
import { contactFormSchema } from "@/lib/schemas/contact";
import { requireAdmin } from "@/lib/require-admin";

export async function submitContactForm(raw: unknown) {
  const data = contactFormSchema.parse(raw);
  const id = randomUUID();
  const now = new Date();
  await getDb().insert(messages).values({
    id,
    senderName: data.senderName,
    senderEmail: data.senderEmail,
    messageContent: data.messageContent,
    createdAt: now,
  });
  revalidatePath("/admin/messages");
  return { ok: true as const };
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await getDb().delete(messages).where(eq(messages.id, id));
  revalidatePath("/admin/messages");
}
