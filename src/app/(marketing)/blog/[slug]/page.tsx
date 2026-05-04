import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { blogs } from "@/db/schema";
import { getLocale, tPair } from "@/lib/locale";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const row = await getDb().select().from(blogs).where(eq(blogs.slug, slug)).limit(1);
  const b = row[0];
  if (!b) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="text-sm text-cyan-800 hover:underline">
        ← {locale === "en" ? "Back to blog" : "Kembali ke blog"}
      </Link>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={b.thumbnailUrl ?? "/placeholder-blog.svg"}
        alt=""
        className="mt-6 aspect-video w-full rounded-xl border object-cover bg-muted"
      />
      <p className="mt-6 text-sm text-muted-foreground">
        {b.publishedAt
          ? new Date(b.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
              dateStyle: "long",
            })
          : ""}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {tPair(locale, { id: b.titleId, en: b.titleEn })}
      </h1>
      <div className="mt-8 max-w-none whitespace-pre-wrap text-base leading-relaxed text-muted-foreground">
        {tPair(locale, { id: b.contentId, en: b.contentEn })}
      </div>
    </article>
  );
}
