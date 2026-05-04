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
import { gallery } from "@/db/schema";
import { createGalleryItem, updateGalleryItem } from "@/actions/gallery";
import { toast } from "sonner";

type Row = InferSelectModel<typeof gallery>;

type Props = {
  row?: Row | null;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  trigger?: React.ReactNode;
};

export function GalleryDialog({ row, open: controlledOpen, onOpenChange, trigger }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [titleId, setTitleId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pending, setPending] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (row) {
      setTitleId(row.titleId);
      setTitleEn(row.titleEn);
      setImageUrl(row.imageUrl);
    } else {
      setTitleId("");
      setTitleEn("");
      setImageUrl("/placeholder-gallery.svg");
    }
  }, [row, open]);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function submit() {
    setPending(true);
    const payload = { titleId, titleEn, imageUrl };
    try {
      if (row) await updateGalleryItem(row.id, payload);
      else await createGalleryItem(payload);
      toast.success("Tersimpan");
      setOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal");
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{row ? "Edit galeri" : "Tambah foto"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Judul (ID)</Label>
              <Input value={titleId} onChange={(e) => setTitleId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Title (EN)</Label>
              <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>URL gambar</Label>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
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
