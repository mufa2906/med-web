"use client";

import { useState } from "react";
import type { InferSelectModel } from "drizzle-orm";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { gallery } from "@/db/schema";
import { deleteGalleryItem } from "@/actions/gallery";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GalleryDialog } from "@/components/admin/gallery-dialog";
import { toast } from "sonner";

type Row = InferSelectModel<typeof gallery>;

export function GalleryTable({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState(initial);
  const [edit, setEdit] = useState<Row | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function remove(id: string) {
    if (!confirm("Hapus item ini?")) return;
    try {
      await deleteGalleryItem(id);
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal");
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <GalleryDialog
          trigger={
            <Button>
              <Plus className="mr-2 size-4" />
              Tambah foto
            </Button>
          }
        />
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Preview</TableHead>
              <TableHead>Judul (ID)</TableHead>
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
              rows.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.imageUrl} alt="" className="h-12 w-16 rounded-md object-cover bg-muted" />
                  </TableCell>
                  <TableCell className="font-medium">{g.titleId}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEdit(g);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => void remove(g.id)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <GalleryDialog
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
