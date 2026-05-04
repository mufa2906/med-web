"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { teams } from "@/db/schema";
import { teamFormSchema } from "@/lib/schemas/team";
import { requireAdmin } from "@/lib/require-admin";

export async function createTeamMember(raw: unknown) {
  await requireAdmin();
  const data = teamFormSchema.parse(raw);
  const id = randomUUID();
  const now = new Date();
  await getDb().insert(teams).values({
    id,
    ...data,
    sortOrder: data.sortOrder ?? 0,
    createdAt: now,
  });
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
}

export async function updateTeamMember(id: string, raw: unknown) {
  await requireAdmin();
  const data = teamFormSchema.parse(raw);
  await getDb()
    .update(teams)
    .set({ ...data, sortOrder: data.sortOrder ?? 0 })
    .where(eq(teams.id, id));
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await getDb().delete(teams).where(eq(teams.id, id));
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
}
