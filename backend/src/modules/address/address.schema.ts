import { z } from "zod";

export const createAddressSchema = z
  .object({
    addressType: z.string(),
    addressLine1: z.string().min(1, "address can not be empty"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City can not be empty"),
    state: z.string().min(1, "State can not be empty"),
    pinCode: z.string().min(1, "pinCode can not be empty"),
    country: z.string().min(1, "country can not be empty"),
  })
  .strict();
export const updateAddressSchema = z.object({
  addressType: z.string().optional(),
  addressLine1: z.string().min(1, "address can not be empty").optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City can not be empty").optional(),
  state: z.string().min(1, "State can not be empty").optional(),
  pinCode: z.string().min(1, "pinCode can not be empty").optional(),
  country: z.string().min(1, "country can not be empty").optional(),
});
export type createAddressDTO = z.infer<typeof createAddressSchema>;
export type updateAddressDTO = z.infer<typeof updateAddressSchema>;
