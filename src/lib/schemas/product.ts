import { z } from "zod";

export const productFormSchema = z.object({
  nameId: z.string().min(1, "Wajib diisi"),
  nameEn: z.string().min(1, "Required"),
  descriptionId: z.string().min(1),
  descriptionEn: z.string().min(1),
  imageUrl: z.string().min(1),
  category: z.string().min(1),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
