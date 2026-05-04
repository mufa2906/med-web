import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { messages } from "@/db/schema";
import { MessagesTable } from "@/components/admin/messages-table";

export default async function AdminMessagesPage() {
  const list = await getDb().select().from(messages).orderBy(desc(messages.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Kotak pesan</h1>
      <p className="mt-1 text-muted-foreground">Pesan dari formulir kontak website.</p>
      <div className="mt-8">
        <MessagesTable initial={list} />
      </div>
    </div>
  );
}
