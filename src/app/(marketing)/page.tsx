import Link from "next/link";
import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { blogs, products } from "@/db/schema";
import { getLocale, tPair, type Locale } from "@/lib/locale";
import { siteChrome } from "@/lib/copy";
import { ParallaxHero } from "@/components/parallax-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function heroCopy(locale: Locale) {
  if (locale === "en") {
    return {
      title: "Clinical-grade supply for healthier communities",
      subtitle:
        "Premium medical equipment distribution with responsive support and transparent partnership.",
    };
  }
  return {
    title: "Pasokan bermutu klinis untuk masyarakat lebih sehat",
    subtitle:
      "Distribusi alat kesehatan premium dengan dukungan responsif dan kemitraan transparan.",
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const chrome = siteChrome(locale);
  const hero = heroCopy(locale);
  const db = getDb();

  const featuredProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(3);

  const featuredPosts = await db
    .select()
    .from(blogs)
    .orderBy(desc(blogs.publishedAt))
    .limit(2);

  return (
    <>
      <ParallaxHero locale={locale} title={hero.title} subtitle={hero.subtitle} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {locale === "en" ? "Featured products" : "Produk unggulan"}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {locale === "en" ? "Trusted devices for hospitals and clinics." : "Perangkat terpercaya untuk rumah sakit dan klinik."}
            </p>
          </div>
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline" }), "shrink-0 rounded-full")}
          >
            {chrome.ctaProducts}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl}
                  alt=""
                  className="aspect-[4/3] w-full object-cover bg-muted"
                />
                <CardHeader>
                  <CardTitle className="text-lg">
                    {tPair(locale, { id: p.nameId, en: p.nameEn })}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {tPair(locale, { id: p.descriptionId, en: p.descriptionEn })}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-cyan-950/10 bg-[#f8fcfd] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {locale === "en" ? "Latest articles" : "Artikel terbaru"}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featuredPosts.map((b) => (
              <Link key={b.id} href={`/blog/${b.slug}`}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.thumbnailUrl ?? "/placeholder-blog.svg"}
                    alt=""
                    className="aspect-video w-full object-cover bg-muted"
                  />
                  <CardContent className="p-6">
                    <p className="font-medium text-slate-900">
                      {tPair(locale, { id: b.titleId, en: b.titleEn })}
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {tPair(locale, { id: b.contentId, en: b.contentEn })}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "link" }), "px-0")}
            >
              {locale === "en" ? "All articles" : "Semua artikel"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
