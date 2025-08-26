import { email, z } from "zod";

export const userSchema = z.object({
  id: z.uuidv4(),
  nif: z.string(),
  avatar: z.url().optional(),
  nom: z.string(),
  email: email(),
  empresa: z.string().nullable(),
  rol: z.string(),
  access: z.string(),
});

export type User = z.infer<typeof userSchema>;
