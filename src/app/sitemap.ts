import type { MetadataRoute } from "next";
import { getDb } from "@/db/client";
import { blogs, products } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/testimonials",
    "/gallery",
    "/blog",
    "/team",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const db = getDb();
  const [blogRows, productRows] = await Promise.all([
    db.select({ slug: blogs.slug, updatedAt: blogs.updatedAt }).from(blogs),
    db.select({ id: products.id, updatedAt: products.updatedAt }).from(products),
  ]);

  const blogUrls: MetadataRoute.Sitemap = blogRows.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: b.updatedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productUrls: MetadataRoute.Sitemap = productRows.map((p) => ({
    url: `${base}/products/${p.id}`,
    lastModified: p.updatedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogUrls, ...productUrls];
}
