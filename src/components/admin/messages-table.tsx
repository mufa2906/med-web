"use client";

import { useState } from "react";
import type { InferSelectModel } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import { messages } from "@/db/schema";
import { deleteMessage } from "@/actions/messages";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

type Row = InferSelectModel<typeof messages>;

export function MessagesTable({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState(initial);

  async function remove(id: string) {
    if (!confirm("Hapus pesan ini?")) return;
    try {
      await deleteMessage(id);
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal");
    }
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Waktu</TableHead>
            <TableHead>Dari</TableHead>
            <TableHead className="hidden lg:table-cell">Email</TableHead>
            <TableHead>Pesan</TableHead>
            <TableHead className="w-16 text-right"> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Belum ada pesan
              </TableCell>
            </TableRow>
          ) : (
            rows.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {m.createdAt ? new Date(m.createdAt).toLocaleString("id-ID") : "—"}
                </TableCell>
                <TableCell className="font-medium">{m.senderName}</TableCell>
                <TableCell className="hidden lg:table-cell">{m.senderEmail}</TableCell>
                <TableCell className="max-w-md truncate text-sm">{m.messageContent}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => void remove(m.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
