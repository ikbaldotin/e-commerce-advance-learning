import { CatchAsync } from "../../utils/CatchAsync.js";
import { Request, Response } from "express";
import orderService from "./order.container.js";
import { SendResponse } from "../../utils/SendResponse.js";
export const createOrderController = CatchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id as string;
    const result = await orderService.createOrderController(userId, req.body);
    SendResponse(res, 201, {
      success: true,
      message: "order place successfully",
      data: result,
    });
  },
);

export const getMyOrderController = CatchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id as string;

    const result = await orderService.getMyOrder(userId);
    SendResponse(res, 201, {
      success: true,
      message: "order fetched successfully",
      data: result,
    });
  },
);

export const updatedOrderStatusController = CatchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;

    const result = await orderService.updatedOrderStatus(orderId, req.body);
    SendResponse(res, 201, {
      success: true,
      message: "update status succesfuly",
      data: result,
    });
  },
);

export const cancelOrderController = CatchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;
    const userId = req.user.id;
    const result = await orderService.cancelOrder(orderId, userId);
    SendResponse(res, 201, {
      success: true,
      message: "order deleted successfully",
      data: result,
    });
  },
);
