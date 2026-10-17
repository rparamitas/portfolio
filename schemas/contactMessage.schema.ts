import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(80, "Name must be at most 80 characters long"),
  title: z
    .string()
    .min(4, "Title must be at least 4 characters long")
    .max(120, "Title must be at most 120 characters long"),
  body: z
    .string()
    .min(20, "Message must be at least 20 characters long")
    .max(2000, "Message must be at most 2000 characters long"),
});

export type ContactMessageType = z.infer<typeof contactMessageSchema>;
