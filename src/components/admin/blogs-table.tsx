"use client";

import { useState } from "react";
import type { InferSelectModel } from "drizzle-orm";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { blogs } from "@/db/schema";
import { deleteBlog } from "@/actions/blogs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogDialog } from "@/components/admin/blog-dialog";
import { toast } from "sonner";

type Row = InferSelectModel<typeof blogs>;

export function BlogsTable({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState(initial);
  const [edit, setEdit] = useState<Row | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function remove(id: string) {
    if (!confirm("Hapus artikel ini?")) return;
    try {
      await deleteBlog(id);
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal");
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <BlogDialog
          trigger={
            <Button>
              <Plus className="mr-2 size-4" />
              Artikel baru
            </Button>
          }
        />
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slug</TableHead>
              <TableHead className="hidden md:table-cell">Judul (ID)</TableHead>
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
              rows.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-sm">{b.slug}</TableCell>
                  <TableCell className="hidden max-w-xs truncate md:table-cell">{b.titleId}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEdit(b);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => void remove(b.id)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <BlogDialog
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
