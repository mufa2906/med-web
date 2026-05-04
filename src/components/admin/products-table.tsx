"use client";

import { useState } from "react";
import type { InferSelectModel } from "drizzle-orm";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { products } from "@/db/schema";
import { deleteProduct } from "@/actions/products";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductDialog } from "@/components/admin/product-dialog";
import { toast } from "sonner";

type Row = InferSelectModel<typeof products>;

export function ProductsTable({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState(initial);
  const [edit, setEdit] = useState<Row | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function remove(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    try {
      await deleteProduct(id);
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success("Produk dihapus");
    } catch {
      toast.error("Gagal menghapus");
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <ProductDialog
          trigger={
            <Button>
              <Plus className="mr-2 size-4" />
              Tambah produk
            </Button>
          }
        />
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Gambar</TableHead>
              <TableHead>Nama (ID)</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="w-28 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Belum ada produk
                </TableCell>
              </TableRow>
            ) : (
              rows.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element -- admin may paste any image URL */}
                    <img
                      src={p.imageUrl}
                      alt=""
                      className="h-12 w-12 rounded-md object-cover bg-muted"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{p.nameId}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEdit(p);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => void remove(p.id)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ProductDialog
        product={edit}
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setEdit(null);
        }}
      />
    </>
  );
}
