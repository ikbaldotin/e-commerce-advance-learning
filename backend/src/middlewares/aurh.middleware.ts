import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Unautohrized request", 401);
    }

    const decoded = verifyAccessToken(token);
    const user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      createdAt: decoded.createdAt,
      updatedAt: decoded.updatedAt,
    };

    req.user = user;

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

export const verifySeller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  try {
    if (user?.role !== "SELLER") {
      throw new AppError("You are not authorizeed", 401);
    }
    next();
  } catch (error) {
    throw new AppError("sometihing is wrong in verify user", 404);
  }
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      throw new AppError("You are not authorizeed", 401);
    }
    next();
  } catch (error) {
    throw new AppError("sometihing is wrong in admin user", 404);
  }
};
