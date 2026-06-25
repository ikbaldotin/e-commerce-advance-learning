import { User } from "@prisma/client";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../config/env.config.js";
import { IJwtPayLoad } from "../types/index.js";
import jwt, { SignOptions } from "jsonwebtoken";
const accessTokenSecret = ACCESS_TOKEN_SECRET!;
const accessTokenExpiry = ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];
export const generateAccessToken = (user: IJwtPayLoad) => {
  return jwt.sign({ user }, accessTokenSecret, {
    expiresIn: accessTokenExpiry,
  });
};
const refreshTokenSecret = REFRESH_TOKEN_SECRET!;
const refreshTokenExpiry = REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];
export const generateRefreshToken = (user: IJwtPayLoad) => {
  return jwt.sign({ user }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiry,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};

export const toJwtPayload = (user: User): IJwtPayLoad => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
