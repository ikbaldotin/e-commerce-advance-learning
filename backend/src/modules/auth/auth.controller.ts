import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync.js";
import authService from "./auth.container.js";
import { SendResponse } from "../../utils/SendResponse.js";
import { destoryCookies, setCookies } from "../../utils/auth.helper.js";

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
      message: "login logged in successfully ",
      data: result,
    });
  },
);

export const getCurrentUserController = CatchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    const result = await authService.getCurrentUser(user.id);

    SendResponse(res, 201, {
      success: true,
      message: "user details fetched successfully",
      data: result,
    });
  },
);

export const logoutControlller = CatchAsync(
  async (req: Request, res: Response) => {
    const isLoggout = await authService.logout(req.body);
    if (isLoggout) {
      destoryCookies(res);
    }
    SendResponse(res, 200, {
      success: true,
      message: "user logout successfully",
    });
  },
);

export const logoutAllDeviceController = CatchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const isLoggoutAllDevices = await authService.logoutAllDevices(userId);
    if (isLoggoutAllDevices) {
      destoryCookies(res);
    }
    SendResponse(res, 200, {
      success: true,
      message: "user logout all devices successfully",
    });
  },
);

export const refreshTokenController = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.refreshToken(req.body);
    setCookies(res, result.accessToken, result.refreshToken);
    SendResponse(res, 200, {
      success: true,
      message: " token refresh ",
      data: result,
    });
  },
);
