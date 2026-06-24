import { z } from "zod";

export const registerUserSchema = z.object({
  firstname: z.string().min(1, "first name can not empty"),
  lastname: z.string().optional(),
  email: z.email(),
  password: z.string().min(6, "password at least 6 character long"),
  role: z.enum(["USER", "SELLER", "ADMIN"]).optional(),
  phoneNumber: z.string().min(6, "phone number must be 6").max(12),
});

export type registerUserDTO = z.infer<typeof registerUserSchema>;
