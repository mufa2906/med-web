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
import { testimonials } from "@/db/schema";
import { createTestimonial, updateTestimonial } from "@/actions/testimonials";
import { toast } from "sonner";

type Row = InferSelectModel<typeof testimonials>;

type Props = {
  row?: Row | null;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  trigger?: React.ReactNode;
};

export function TestimonialDialog({ row, open: controlledOpen, onOpenChange, trigger }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [clientName, setClientName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [messageId, setMessageId] = useState("");
  const [messageEn, setMessageEn] = useState("");
  const [pending, setPending] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (row) {
      setClientName(row.clientName);
      setClientRole(row.clientRole);
      setMessageId(row.messageId);
      setMessageEn(row.messageEn);
    } else {
      setClientName("");
      setClientRole("");
      setMessageId("");
      setMessageEn("");
    }
  }, [row, open]);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function submit() {
    setPending(true);
    const payload = { clientName, clientRole, messageId, messageEn };
    try {
      if (row) await updateTestimonial(row.id, payload);
      else await createTestimonial(payload);
      toast.success(row ? "Diperbarui" : "Ditambahkan");
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{row ? "Edit testimoni" : "Tambah testimoni"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="space-y-2">
            <Label>Nama klien</Label>
            <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Jabatan / peran</Label>
            <Input value={clientRole} onChange={(e) => setClientRole(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Pesan (ID)</Label>
            <Textarea value={messageId} onChange={(e) => setMessageId(e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Message (EN)</Label>
            <Textarea value={messageEn} onChange={(e) => setMessageEn(e.target.value)} rows={3} />
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
