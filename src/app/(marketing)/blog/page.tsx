import Link from "next/link";
import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { blogs } from "@/db/schema";
import { getLocale, tPair } from "@/lib/locale";
import { Card, CardContent } from "@/components/ui/card";

export default async function BlogListPage() {
  const locale = await getLocale();
  const list = await getDb().select().from(blogs).orderBy(desc(blogs.publishedAt));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        {locale === "en" ? "Health articles" : "Artikel kesehatan"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {locale === "en" ? "Education and best practices." : "Edukasi dan praktik terbaik."}
      </p>
      <div className="mt-10 flex flex-col gap-8">
        {list.map((b) => (
          <Link key={b.id} href={`/blog/${b.slug}`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-md md:flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.thumbnailUrl ?? "/placeholder-blog.svg"}
                alt=""
                className="h-48 w-full object-cover md:h-auto md:w-72 md:shrink-0"
              />
              <CardContent className="flex flex-col justify-center p-6">
                <p className="text-xs uppercase tracking-wide text-cyan-800">
                  {b.publishedAt ? new Date(b.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "id-ID") : ""}
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  {tPair(locale, { id: b.titleId, en: b.titleEn })}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {tPair(locale, { id: b.contentId, en: b.contentEn })}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
