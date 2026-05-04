"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/actions/messages";
import { toast } from "sonner";

type Props = {
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
  };
};

export function ContactForm({ labels }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      await submitContactForm({ senderName: name, senderEmail: email, messageContent: message });
      toast.success(labels.success);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    }
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="c-name">{labels.name}</Label>
        <Input id="c-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-email">{labels.email}</Label>
        <Input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-msg">{labels.message}</Label>
        <Textarea id="c-msg" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <Button type="submit" disabled={pending} className="rounded-full">
        {pending ? "…" : labels.submit}
      </Button>
    </form>
  );
}
