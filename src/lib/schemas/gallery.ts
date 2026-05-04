import { z } from "zod";

export const galleryFormSchema = z.object({
  titleId: z.string().min(1),
  titleEn: z.string().min(1),
  imageUrl: z.string().min(1),
});

export type GalleryFormInput = z.infer<typeof galleryFormSchema>;
