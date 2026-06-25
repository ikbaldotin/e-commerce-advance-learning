import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { IJwtPayLoad } from "../types/index.js";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new AppError("Unauthorized request", 401);
    }
    const decoded = verifyAccessToken(token) as IJwtPayLoad;
    const user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      createdAt: decoded.createdAt,
      updatedAt: decoded.updatedAt,
    };
    req.user = user;
  } catch (error) {
    next(new AppError("invalid or exprise token", 401));
  }
};
