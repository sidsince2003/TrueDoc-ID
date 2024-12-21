import * as z from "zod";

export const certificateFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  documents: z.string().min(1, "Please list at least one document"),
});

export type CertificateFormData = z.infer<typeof certificateFormSchema>;