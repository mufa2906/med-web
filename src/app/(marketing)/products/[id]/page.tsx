import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDb } from "@/db/client";
import { products } from "@/db/schema";
import { getLocale, tPair } from "@/lib/locale";

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const locale = await getLocale();
  const row = await getDb().select().from(products).where(eq(products.id, id)).limit(1);
  const p = row[0];
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/products" className="text-sm text-cyan-800 hover:underline">
        ← {locale === "en" ? "Back to products" : "Kembali ke produk"}
      </Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.imageUrl} alt="" className="w-full rounded-xl border bg-muted object-cover shadow-sm" />
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-cyan-800">{p.category}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {tPair(locale, { id: p.nameId, en: p.nameEn })}
          </h1>
          <p className="mt-6 whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {tPair(locale, { id: p.descriptionId, en: p.descriptionEn })}
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants(), "mt-8 rounded-full")}
          >
            {locale === "en" ? "Request information" : "Minta informasi"}
          </Link>
        </div>
      </div>
    </article>
  );
}
