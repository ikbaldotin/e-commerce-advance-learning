import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import authService from "./auth.container.js";
import { SendResponse } from "../../utils/SendResponse.js";
import { setCookies } from "../../utils/auth.helper.js";

export const registerUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUserService(req.body);
    setCookies(res, result.accessToken, result.refreshToken);
    SendResponse(res, 201, {
      success: true,
      message: "user create successfully",
      data: result,
    });
  },
);

export const loginUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.loginUserService(req.body);
    setCookies(res, result.accessToken, result.refreshToken);
    SendResponse(res, 201, {
      success: true,
      message: "login ",
      data: result,
    });
  },
);
