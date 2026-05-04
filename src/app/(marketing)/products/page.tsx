import Link from "next/link";
import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { products } from "@/db/schema";
import { getLocale, tPair } from "@/lib/locale";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProductsPage() {
  const locale = await getLocale();
  const list = await getDb().select().from(products).orderBy(desc(products.createdAt));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        {locale === "en" ? "Products" : "Produk"}
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {locale === "en"
          ? "Browse our medical equipment catalog."
          : "Jelajahi katalog alat kesehatan kami."}
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imageUrl} alt="" className="aspect-[4/3] w-full object-cover bg-muted" />
              <CardHeader>
                <span className="text-xs font-medium uppercase tracking-wide text-cyan-800">
                  {p.category}
                </span>
                <CardTitle className="text-xl">{tPair(locale, { id: p.nameId, en: p.nameEn })}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {tPair(locale, { id: p.descriptionId, en: p.descriptionEn })}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
