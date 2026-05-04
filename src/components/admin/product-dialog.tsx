"use client";

import { useEffect, useState } from "react";
import type { InferSelectModel } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/db/schema";
import { createProduct, updateProduct } from "@/actions/products";
import { toast } from "sonner";

type Row = InferSelectModel<typeof products>;

type Props = {
  product?: Row | null;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  trigger?: React.ReactNode;
};

export function ProductDialog({ product, open: controlledOpen, onOpenChange, trigger }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [nameId, setNameId] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descriptionId, setDescriptionId] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [pending, setPending] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- sync controlled form when edit target changes */
  useEffect(() => {
    if (product) {
      setNameId(product.nameId);
      setNameEn(product.nameEn);
      setDescriptionId(product.descriptionId);
      setDescriptionEn(product.descriptionEn);
      setImageUrl(product.imageUrl);
      setCategory(product.category);
    } else {
      setNameId("");
      setNameEn("");
      setDescriptionId("");
      setDescriptionEn("");
      setImageUrl("/placeholder-product.svg");
      setCategory("general");
    }
  }, [product, open]);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function submit() {
    setPending(true);
    const payload = {
      nameId,
      nameEn,
      descriptionId,
      descriptionEn,
      imageUrl,
      category,
    };
    try {
      if (product) await updateProduct(product.id, payload);
      else await createProduct(payload);
      toast.success(product ? "Produk diperbarui" : "Produk ditambahkan");
      setOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal menyimpan");
    }
    setPending(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <span className="inline-flex" onClick={() => setOpen(true)}>
          {trigger}
        </span>
      ) : null}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "Edit produk" : "Tambah produk"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nama (ID)</Label>
              <Input value={nameId} onChange={(e) => setNameId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Name (EN)</Label>
              <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Deskripsi (ID)</Label>
              <Textarea value={descriptionId} onChange={(e) => setDescriptionId(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Description (EN)</Label>
              <Textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} rows={3} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>URL gambar</Label>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/uploads/..." />
          </div>
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={() => void submit()} disabled={pending}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
