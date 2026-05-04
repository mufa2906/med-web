import { cookies } from "next/headers";

export type Locale = "id" | "en";

export const locales: Locale[] = ["id", "en"];
export const defaultLocale: Locale = "id";

const COOKIE = "med_locale";

export async function getLocale(): Promise<Locale> {
  const c = (await cookies()).get(COOKIE)?.value;
  if (c === "en" || c === "id") return c;
  return defaultLocale;
}

export function cookieName() {
  return COOKIE;
}

/** Pick localized string pair stored as *_id / *_en columns */
export function tPair<T extends { id: string; en: string }>(locale: Locale, pair: T): string {
  return locale === "en" ? pair.en : pair.id;
}
