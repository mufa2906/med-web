"use server";

import { cookies } from "next/headers";
import { cookieName, defaultLocale, type Locale } from "@/lib/locale";

export async function setLocaleAction(locale: Locale) {
  const jar = await cookies();
  jar.set(cookieName(), locale === "en" ? "en" : defaultLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
