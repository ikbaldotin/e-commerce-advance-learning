import { Address } from "@prisma/client";
import { createAddressDTO, updateAddressDTO } from "./address.schema.js";

export interface IAddressRepository {
  createAddress(data: createAddressDTO, userId: string): Promise<Address>;
  getAddressByuserId(userId: string): Promise<Address[]>;
  getAddressByuserIdandAddressId(
    userId: string,
    addressId: string,
  ): Promise<Address | null>;
  updateAddress(addressId: string, data: updateAddressDTO): Promise<Address>;
  deleteAddress(addressId: string): Promise<null>;
}
