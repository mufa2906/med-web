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
import { teams } from "@/db/schema";
import { createTeamMember, updateTeamMember } from "@/actions/teams";
import { toast } from "sonner";

type Row = InferSelectModel<typeof teams>;

type Props = {
  row?: Row | null;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  trigger?: React.ReactNode;
};

export function TeamDialog({ row, open: controlledOpen, onOpenChange, trigger }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [nameId, setNameId] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [positionId, setPositionId] = useState("");
  const [positionEn, setPositionEn] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [pending, setPending] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (row) {
      setNameId(row.nameId);
      setNameEn(row.nameEn);
      setPositionId(row.positionId);
      setPositionEn(row.positionEn);
      setPhotoUrl(row.photoUrl);
      setSortOrder(row.sortOrder);
    } else {
      setNameId("");
      setNameEn("");
      setPositionId("");
      setPositionEn("");
      setPhotoUrl("/placeholder-team.svg");
      setSortOrder(0);
    }
  }, [row, open]);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function submit() {
    setPending(true);
    const payload = {
      nameId,
      nameEn,
      positionId,
      positionEn,
      photoUrl,
      sortOrder,
    };
    try {
      if (row) await updateTeamMember(row.id, payload);
      else await createTeamMember(payload);
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{row ? "Edit anggota" : "Tambah anggota tim"}</DialogTitle>
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
              <Label>Jabatan (ID)</Label>
              <Input value={positionId} onChange={(e) => setPositionId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Position (EN)</Label>
              <Input value={positionEn} onChange={(e) => setPositionEn(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>URL foto</Label>
            <Input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Urutan tampil</Label>
            <Input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
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
