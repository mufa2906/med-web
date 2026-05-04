import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { gallery } from "@/db/schema";
import { getLocale, tPair } from "@/lib/locale";

export default async function GalleryPage() {
  const locale = await getLocale();
  const list = await getDb().select().from(gallery).orderBy(desc(gallery.createdAt));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        {locale === "en" ? "Gallery" : "Galeri"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {locale === "en" ? "Documentation from the field." : "Dokumentasi dari lapangan."}
      </p>
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {list.map((g) => (
          <figure key={g.id} className="mb-4 break-inside-avoid overflow-hidden rounded-lg border bg-card shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.imageUrl} alt="" className="w-full object-cover" />
            <figcaption className="p-3 text-sm font-medium">
              {tPair(locale, { id: g.titleId, en: g.titleEn })}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
