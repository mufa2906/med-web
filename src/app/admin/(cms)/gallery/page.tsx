import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { gallery } from "@/db/schema";
import { GalleryTable } from "@/components/admin/gallery-table";

export default async function AdminGalleryPage() {
  const list = await getDb().select().from(gallery).orderBy(desc(gallery.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Galeri</h1>
      <p className="mt-1 text-muted-foreground">Koleksi dokumentasi foto.</p>
      <div className="mt-8">
        <GalleryTable initial={list} />
      </div>
    </div>
  );
}
