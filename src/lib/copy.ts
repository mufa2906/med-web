import type { Locale } from "@/lib/locale";

export function siteNav(locale: Locale) {
  const id = {
    products: "Produk",
    testimonials: "Testimoni",
    gallery: "Galeri",
    blog: "Blog",
    team: "Tim",
    contact: "Kontak",
    home: "Beranda",
  };
  const en = {
    products: "Products",
    testimonials: "Testimonials",
    gallery: "Gallery",
    blog: "Blog",
    team: "Team",
    contact: "Contact",
    home: "Home",
  };
  return locale === "en" ? en : id;
}

export function siteChrome(locale: Locale) {
  const id = {
    tagline: "Distribusi alat kesehatan terpercaya",
    ctaProducts: "Lihat produk",
    ctaContact: "Hubungi kami",
    rights: "Hak cipta dilindungi.",
    admin: "Admin",
  };
  const en = {
    tagline: "Trusted medical equipment distribution",
    ctaProducts: "View products",
    ctaContact: "Contact us",
    rights: "All rights reserved.",
    admin: "Admin",
  };
  return locale === "en" ? en : id;
}
