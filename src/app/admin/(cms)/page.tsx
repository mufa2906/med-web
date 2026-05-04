import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  { title: "Produk", href: "/admin/products", desc: "Katalog alat kesehatan" },
  { title: "Testimoni", href: "/admin/testimonials", desc: "Ulasan klien" },
  { title: "Galeri", href: "/admin/gallery", desc: "Foto dokumentasi" },
  { title: "Blog", href: "/admin/blog", desc: "Artikel kesehatan" },
  { title: "Tim", href: "/admin/team", desc: "Profil manajemen" },
  { title: "Pesan", href: "/admin/messages", desc: "Formulir kontak masuk" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Kelola konten website dari menu di samping atau kartu di bawah.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">{c.title}</CardTitle>
                <ArrowRight className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardDescription>{c.desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
