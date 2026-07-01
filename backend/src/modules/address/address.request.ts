import { createAddressDTO, updateAddressDTO } from "./address.schema.js";

export const cleanCreateData = (data: createAddressDTO): createAddressDTO => {
  return {
    addressType: data.addressType.toLowerCase(),
    addressLine1: data.addressLine1.toLowerCase(),
    addressLine2: data.addressLine2?.toLowerCase(),
    city: data.city.toLowerCase(),
    state: data.state.toLowerCase(),
    pinCode: data.pinCode.toLowerCase(),
    country: data.country.toLowerCase(),
  };
};
export const cleanUpdateData = (data: updateAddressDTO): updateAddressDTO => {
  return {
    addressType: data.addressType?.toLowerCase(),
    addressLine1: data.addressLine1?.toLowerCase(),
    addressLine2: data.addressLine2?.toLowerCase(),
    city: data.city?.toLowerCase(),
    state: data.state?.toLowerCase(),
    pinCode: data.pinCode?.toLowerCase(),
  };
};
