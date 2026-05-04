import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";

export async function requireAdmin() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");
  return session;
}
