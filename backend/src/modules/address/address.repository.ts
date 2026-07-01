import { Address } from "@prisma/client";
import { IAddressRepository } from "./address.interface.js";
import { createAddressDTO, updateAddressDTO } from "./address.schema.js";
import { prisma } from "../../lib/prisma.js";

export class AddressRepository implements IAddressRepository {
  async createAddress(
    data: createAddressDTO,
    userId: string,
  ): Promise<Address> {
    const address = await prisma.address.create({
      data: {
        userId,
        ...data,
      },
    });
    return address;
  }
  async getAddressByuserId(userId: string): Promise<Address[]> {
    const address = await prisma.address.findMany({
      where: {
        userId,
      },
    });
    return address;
  }
  async getAddressByuserIdandAddressId(
    userId: string,
    addressId: string,
  ): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    });
    return address;
  }
  async updateAddress(
    addressId: string,
    data: updateAddressDTO,
  ): Promise<Address> {
    const updateAddress = await prisma.address.update({
      where: {
        id: addressId,
      },
      data,
    });
    return updateAddress;
  }
  async deleteAddress(addressId: string): Promise<any> {
    await prisma.address.delete({
      where: {
        id: addressId,
      },
    });
  }
}
