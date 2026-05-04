import { asc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { teams } from "@/db/schema";
import { getLocale, tPair } from "@/lib/locale";
import { Card, CardContent } from "@/components/ui/card";

export default async function TeamPage() {
  const locale = await getLocale();
  const list = await getDb().select().from(teams).orderBy(asc(teams.sortOrder), asc(teams.createdAt));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        {locale === "en" ? "Our team" : "Tim kami"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {locale === "en" ? "Leadership and operations." : "Kepemimpinan dan operasional."}
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <Card key={m.id} className="overflow-hidden text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.photoUrl} alt="" className="mx-auto mt-6 h-32 w-32 rounded-full object-cover bg-muted" />
            <CardContent className="pb-8 pt-4">
              <p className="text-lg font-semibold">{tPair(locale, { id: m.nameId, en: m.nameEn })}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {tPair(locale, { id: m.positionId, en: m.positionEn })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
