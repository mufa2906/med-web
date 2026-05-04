"use client";

import { useState } from "react";
import type { InferSelectModel } from "drizzle-orm";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { teams } from "@/db/schema";
import { deleteTeamMember } from "@/actions/teams";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamDialog } from "@/components/admin/team-dialog";
import { toast } from "sonner";

type Row = InferSelectModel<typeof teams>;

export function TeamTable({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState(initial);
  const [edit, setEdit] = useState<Row | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function remove(id: string) {
    if (!confirm("Hapus dari tim?")) return;
    try {
      await deleteTeamMember(id);
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success("Dihapus");
    } catch {
      toast.error("Gagal");
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <TeamDialog
          trigger={
            <Button>
              <Plus className="mr-2 size-4" />
              Tambah anggota
            </Button>
          }
        />
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Foto</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead className="hidden md:table-cell">Jabatan</TableHead>
              <TableHead className="w-20">Urut</TableHead>
              <TableHead className="w-28 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Kosong
                </TableCell>
              </TableRow>
            ) : (
              rows.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.photoUrl} alt="" className="h-10 w-10 rounded-full object-cover bg-muted" />
                  </TableCell>
                  <TableCell className="font-medium">{t.nameId}</TableCell>
                  <TableCell className="hidden md:table-cell">{t.positionId}</TableCell>
                  <TableCell>{t.sortOrder}</TableCell>
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
      <TeamDialog
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
