import { AddressRepository } from "./address.repository.js";
import { AddressService } from "./address.service.js";

const addressRepository = new AddressRepository();
const addressSErvice = new AddressService(addressRepository);

export default addressSErvice;
