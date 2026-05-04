"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={() => void logout()}>
      <LogOut className="size-4" />
      Keluar
    </Button>
  );
}
