import bcrypt from "bcrypt";
import { Response } from "express";
import crypto from "crypto";
import { NODE_ENV } from "../config/env.config.js";
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  (res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }),
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }));
};
export const hashRefreshToken = (refreshToken: string) => {
  return crypto.createHash("sha256").update(refreshToken).digest("hex");
};
export const destoryCookies = (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
