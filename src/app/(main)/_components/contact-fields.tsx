import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
});

export type ContactFormData = z.infer<typeof contactSchema>;
