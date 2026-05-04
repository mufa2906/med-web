import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { blogs } from "@/db/schema";
import { BlogsTable } from "@/components/admin/blogs-table";

export default async function AdminBlogPage() {
  const list = await getDb().select().from(blogs).orderBy(desc(blogs.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-1 text-muted-foreground">Artikel edukasi kesehatan.</p>
      <div className="mt-8">
        <BlogsTable initial={list} />
      </div>
    </div>
  );
}
