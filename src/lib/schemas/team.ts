import { z } from "zod";

export const teamFormSchema = z.object({
  nameId: z.string().min(1),
  nameEn: z.string().min(1),
  positionId: z.string().min(1),
  positionEn: z.string().min(1),
  photoUrl: z.string().min(1),
  sortOrder: z.coerce.number().int().default(0),
});

export type TeamFormInput = z.infer<typeof teamFormSchema>;
