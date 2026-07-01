import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import addressService from "./address.container.js";
import { SendResponse } from "../../utils/SendResponse.js";

export const createAddressController = CatchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id as string;
    const result = await addressService.createAddressController(
      req.body,
      userId,
    );
    SendResponse(res, 201, {
      success: true,
      message: "create address successfully",
      data: result,
    });
  },
);

export const getAddressByuserIdController = CatchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id as string;
    const result = await addressService.getAddressById(userId);
    SendResponse(res, 200, {
      success: true,
      message: "all address fetched successfully",
      data: result,
    });
  },
);

export const updateAddressController = CatchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id as string;
    const addressId = req.params.addressId as string;
    const result = await addressService.updateAddress(
      userId,
      addressId,
      req.body,
    );
    SendResponse(res, 200, {
      success: true,
      message: "address updated successfully",
      data: result,
    });
  },
);

export const deleteAddressController = CatchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id as string;
    const addressId = req.params.addressId as string;
    await addressService.deleteAddress(addressId, userId);
    SendResponse(res, 201, {
      success: true,
      message: "address deleted successfully",
    });
  },
);
