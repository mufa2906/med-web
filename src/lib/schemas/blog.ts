import { z } from "zod";

export const blogFormSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: huruf kecil, angka, dan tanda hubung"),
  titleId: z.string().min(1),
  titleEn: z.string().min(1),
  contentId: z.string().min(1),
  contentEn: z.string().min(1),
  thumbnailUrl: z.string().optional(),
  /** ISO datetime-local value or empty */
  publishedAt: z.string().optional(),
});

export type BlogFormInput = z.infer<typeof blogFormSchema>;
