import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { testimonials } from "@/db/schema";
import { getLocale, tPair } from "@/lib/locale";
import { Card, CardContent } from "@/components/ui/card";

export default async function TestimonialsPage() {
  const locale = await getLocale();
  const list = await getDb().select().from(testimonials).orderBy(desc(testimonials.createdAt));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        {locale === "en" ? "Testimonials" : "Testimoni"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {locale === "en" ? "What our partners say." : "Apa kata mitra kami."}
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {list.map((t) => (
          <Card key={t.id} className="border-cyan-950/10 bg-card">
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed text-slate-800">
                “{tPair(locale, { id: t.messageId, en: t.messageEn })}”
              </p>
              <p className="mt-4 font-medium">{t.clientName}</p>
              <p className="text-sm text-muted-foreground">{t.clientRole}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
