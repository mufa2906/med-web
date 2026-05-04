import { z } from "zod";

export const testimonialFormSchema = z.object({
  clientName: z.string().min(1),
  clientRole: z.string(),
  messageId: z.string().min(1),
  messageEn: z.string().min(1),
});

export type TestimonialFormInput = z.infer<typeof testimonialFormSchema>;
