import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { testimonials } from "@/db/schema";
import { TestimonialsTable } from "@/components/admin/testimonials-table";

export default async function AdminTestimonialsPage() {
  const list = await getDb().select().from(testimonials).orderBy(desc(testimonials.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Testimoni</h1>
      <p className="mt-1 text-muted-foreground">Ulasan mitra dan pelanggan.</p>
      <div className="mt-8">
        <TestimonialsTable initial={list} />
      </div>
    </div>
  );
}
