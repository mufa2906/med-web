import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  MessageSquareQuote,
  Images,
  BookOpen,
  Users,
  Mail,
} from "lucide-react";
import { getServerSession } from "@/lib/session";
import { AdminLogoutButton } from "@/components/admin/logout-button";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produk", icon: Package },
  { href: "/admin/testimonials", label: "Testimoni", icon: MessageSquareQuote },
  { href: "/admin/gallery", label: "Galeri", icon: Images },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/team", label: "Tim", icon: Users },
  { href: "/admin/messages", label: "Pesan", icon: Mail },
];

export default async function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-56 shrink-0 flex-col border-r bg-card py-6 md:flex">
        <div className="px-4 pb-6">
          <Link href="/" className="text-sm font-semibold tracking-tight text-primary">
            Med CMS
          </Link>
          <p className="mt-1 truncate text-xs text-muted-foreground">{session.user.email}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-2">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t px-2 pt-4">
          <AdminLogoutButton />
        </div>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-card px-4 py-3 md:hidden">
          <span className="font-medium">CMS</span>
          <AdminLogoutButton />
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
