import { AppError } from "../../utils/AppError.js";
import { IAddressRepository } from "./address.interface.js";
import { cleanCreateData, cleanUpdateData } from "./address.request.js";
import { createAddressDTO, updateAddressDTO } from "./address.schema.js";

export class AddressService {
  constructor(private addressRepo: IAddressRepository) {}
  async createAddressController(data: createAddressDTO, userId: string) {
    const cleanedData = cleanCreateData(data);
    const createAddress = await this.addressRepo.createAddress(
      cleanedData,
      userId,
    );
    return createAddress;
  }
  async getAddressById(userId: string) {
    const addresses = await this.addressRepo.getAddressByuserId(userId);
    return addresses;
  }
  async updateAddress(
    userId: string,
    addressId: string,
    data: updateAddressDTO,
  ) {
    const cleanedData = cleanUpdateData(data);
    const exitingAddress =
      await this.addressRepo.getAddressByuserIdandAddressId(userId, addressId);
    if (!exitingAddress) {
      throw new AppError("address not found", 401);
    }

    const updateAddress = await this.addressRepo.updateAddress(
      addressId,
      cleanedData,
    );
    return updateAddress;
  }
  async deleteAddress(addressId: string, userId: string) {
    const exitingAddress =
      await this.addressRepo.getAddressByuserIdandAddressId(userId, addressId);
    if (!exitingAddress) {
      throw new AppError("address not found", 401);
    }
    await this.addressRepo.deleteAddress(addressId);
  }
}
