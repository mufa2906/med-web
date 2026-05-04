import { asc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { teams } from "@/db/schema";
import { TeamTable } from "@/components/admin/team-table";

export default async function AdminTeamPage() {
  const list = await getDb().select().from(teams).orderBy(asc(teams.sortOrder), asc(teams.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Tim</h1>
      <p className="mt-1 text-muted-foreground">Profil manajemen dan staf.</p>
      <div className="mt-8">
        <TeamTable initial={list} />
      </div>
    </div>
  );
}
