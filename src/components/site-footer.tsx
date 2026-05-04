import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { siteChrome } from "@/lib/copy";

export function SiteFooter({ locale }: { locale: Locale }) {
  const chrome = siteChrome(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cyan-950/10 bg-[#f0f9fb] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-600 md:flex-row md:text-left">
        <p>
          © {year} MedDistribusi. {chrome.rights}
        </p>
        <Link href="/admin" className="text-muted-foreground hover:text-foreground">
          CMS
        </Link>
      </div>
    </footer>
  );
}
