"use client";

import { useState } from "react";
import type { InferSelectModel } from "drizzle-orm";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { testimonials } from "@/db/schema";
import { deleteTestimonial } from "@/actions/testimonials";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TestimonialDialog } from "@/components/admin/testimonial-dialog";
import { toast } from "sonner";

type Row = InferSelectModel<typeof testimonials>;

export function TestimonialsTable({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState(initial);
  const [edit, setEdit] = useState<Row | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function remove(id: string) {
    if (!confirm("Hapus testimoni ini?")) return;
    try {
      await deleteTestimonial(id);
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal menghapus");
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <TestimonialDialog
          trigger={
            <Button>
              <Plus className="mr-2 size-4" />
              Tambah testimoni
            </Button>
          }
        />
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Klien</TableHead>
              <TableHead className="hidden md:table-cell">Peran</TableHead>
              <TableHead className="w-28 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Kosong
                </TableCell>
              </TableRow>
            ) : (
              rows.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.clientName}</TableCell>
                  <TableCell className="hidden max-w-xs truncate md:table-cell">{t.clientRole}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEdit(t);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => void remove(t.id)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <TestimonialDialog
        row={edit}
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setEdit(null);
        }}
      />
    </>
  );
}
