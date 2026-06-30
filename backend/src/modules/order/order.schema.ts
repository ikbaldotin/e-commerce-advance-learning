import z from "zod";

export const createOrderSchema = z
  .object({
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1, "at least one item "),
      }),
    ),
  })
  .strict();
export const updatedOrderStatusSchema = z
  .object({
    status: z.enum(["PENDING", "ACCEPTED", "CANCELED"]),
  })
  .strict();
export type createOrderDTO = z.infer<typeof createOrderSchema>;

export type updatedOrderStatusDTO = z.infer<typeof updatedOrderStatusSchema>;
