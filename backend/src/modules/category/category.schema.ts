import { z } from "zod";

export const createCategorySchema = z
  .object({
    categoryName: z.string().min(2, "category name must be at least 2"),
    categoryDescription: z
      .string()
      .min(2, "category description must be at least 2"),
  })
  .strict();
export const updateCategorySchema = z
  .object({
    categoryName: z
      .string()
      .min(2, "category name must be at least 2")
      .optional(),
    categoryDescription: z
      .string()
      .min(2, "category description must be at least 2"),
  })
  .strict();
export type createCategoryDTO = z.infer<typeof createCategorySchema>;
export type updateCategoryDTO = z.infer<typeof updateCategorySchema>;
