import { z } from "zod";

export const createProductSchema = z
  .object({
    categoryId: z.string(),
    productName: z.string().min(3, "product name is at least 3 character"),
    productDescription: z.string().min(5, "product description is at least 5"),
    price: z.string(),
    stock: z.string(),
  })
  .strict();

export const editProductSchema = z.object({
  productName: z
    .string()
    .min(3, "product name is at least 3 character")
    .optional(),
  productDescription: z
    .string()
    .min(5, "product description is at least 5")
    .optional(),
  price: z.int().optional(),
  stock: z.int().optional(),
});
export type createProductDTO = z.infer<typeof createProductSchema>;
export type editProductDTO = z.infer<typeof editProductSchema>;
