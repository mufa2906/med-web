import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const session = await getServerSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-sm">
        <h1 className="text-center text-lg font-semibold">Masuk Admin</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Panel pengelolaan konten</p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="underline underline-offset-4 hover:text-foreground">
            Kembali ke website
          </Link>
        </p>
      </div>
    </div>
  );
}
