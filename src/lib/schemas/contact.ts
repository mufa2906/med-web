import { z } from "zod";

export const contactFormSchema = z.object({
  senderName: z.string().min(1, "Nama wajib diisi"),
  senderEmail: z.string().email("Email tidak valid"),
  messageContent: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
