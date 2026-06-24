import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import authService from "./auth.container.js";
import { SendResponse } from "../../utils/SendResponse.js";

export const registerUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUserService(req.body);
    SendResponse(res, 201, {
      success: true,
      message: "user create successfully",
      data: result,
    });
  },
);
