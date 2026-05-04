import Link from "next/link";
import { Menu } from "lucide-react";
import type { Locale } from "@/lib/locale";
import { siteNav, siteChrome } from "@/lib/copy";
import { LanguageSwitcher } from "@/components/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader({ locale }: { locale: Locale }) {
  const nav = siteNav(locale);
  const chrome = siteChrome(locale);
  const links = [
    { href: "/", label: nav.home },
    { href: "/products", label: nav.products },
    { href: "/testimonials", label: nav.testimonials },
    { href: "/gallery", label: nav.gallery },
    { href: "/blog", label: nav.blog },
    { href: "/team", label: nav.team },
    { href: "/contact", label: nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-950/10 bg-[#f8fcfd]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-semibold tracking-tight text-cyan-950">
          MedDistribusi
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-cyan-950/5 hover:text-cyan-950"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <Link href="/admin" className="hidden text-xs text-muted-foreground hover:text-foreground sm:inline">
            {chrome.admin}
          </Link>
          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "md:hidden")}
              aria-label="Menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
