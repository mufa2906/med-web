"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locale";
import { siteChrome } from "@/lib/copy";

type Props = {
  locale: Locale;
  title: string;
  subtitle: string;
};

export function ParallaxHero({ locale, title, subtitle }: Props) {
  const chrome = siteChrome(locale);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "35%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden bg-[#e8f4f8] pb-16 pt-24 md:pb-24"
    >
      <motion.div
        aria-hidden
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-100/90 via-sky-50/80 to-emerald-50/90"
      />
      <motion.div
        aria-hidden
        style={{ y: yFg, opacity: fade }}
        className="pointer-events-none absolute -right-20 top-24 h-[min(70vw,420px)] w-[min(95vw,560px)] md:right-8 md:top-32"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-device.svg"
          alt=""
          className="h-full w-full object-contain drop-shadow-2xl"
        />
      </motion.div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <motion.div style={{ opacity: fade }}>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-800/80">
            {chrome.tagline}
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">{subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/products"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}
            >
              {chrome.ctaProducts}
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-full border-cyan-800/30 bg-white/70 px-8",
              )}
            >
              {chrome.ctaContact}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
