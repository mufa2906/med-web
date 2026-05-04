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
import { blogs } from "@/db/schema";
import { createBlog, updateBlog } from "@/actions/blogs";
import { toDateTimeLocalValue } from "@/lib/datetime-local";
import { toast } from "sonner";

type Row = InferSelectModel<typeof blogs>;

type Props = {
  row?: Row | null;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  trigger?: React.ReactNode;
};

export function BlogDialog({ row, open: controlledOpen, onOpenChange, trigger }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [slug, setSlug] = useState("");
  const [titleId, setTitleId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentId, setContentId] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [pending, setPending] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (row) {
      setSlug(row.slug);
      setTitleId(row.titleId);
      setTitleEn(row.titleEn);
      setContentId(row.contentId);
      setContentEn(row.contentEn);
      setThumbnailUrl(row.thumbnailUrl ?? "");
      setPublishedAt(toDateTimeLocalValue(row.publishedAt ?? null));
    } else {
      setSlug("");
      setTitleId("");
      setTitleEn("");
      setContentId("");
      setContentEn("");
      setThumbnailUrl("");
      setPublishedAt(toDateTimeLocalValue(new Date()));
    }
  }, [row, open]);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function submit() {
    setPending(true);
    const payload = {
      slug,
      titleId,
      titleEn,
      contentId,
      contentEn,
      thumbnailUrl: thumbnailUrl.trim() || undefined,
      publishedAt: publishedAt.trim() || undefined,
    };
    try {
      if (row) await updateBlog(row.id, payload);
      else await createBlog(payload);
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{row ? "Edit artikel" : "Artikel baru"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <Label>Slug URL</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} placeholder="tips-alat-medis" />
          </div>
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
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Konten (ID)</Label>
              <Textarea value={contentId} onChange={(e) => setContentId(e.target.value)} rows={6} />
            </div>
            <div className="space-y-2">
              <Label>Content (EN)</Label>
              <Textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} rows={6} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Thumbnail URL (opsional)</Label>
            <Input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Terbit (opsional)</Label>
            <Input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
            />
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
