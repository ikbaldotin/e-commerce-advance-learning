import { Request, Response } from "express";
import {
  loginUserDTO,
  logoutUserDTO,
  refreshTokenDTO,
  registerUserDTO,
} from "./auth.sechema.js";
import { IAuthRepository } from "./auth.interface.js";
import { AppError } from "../../utils/AppError.js";
import {
  comparePassword,
  hashPassword,
  hashRefreshToken,
} from "../../utils/auth.helper.js";
import { toUserResponse } from "./auth.mapper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  toJwtPayload,
  verifyRefreshToken,
} from "../../utils/jwt.helper.js";
import { IJwtPayLoad } from "../../types/index.js";

export class AuthService {
  constructor(private userRepo: IAuthRepository) {}
  async registerUserService(data: registerUserDTO) {
    const { firstname, lastname, email, password, phoneNumber, role } = data;
    const exitingUser = await this.userRepo.getUserByEmail(email);
    if (exitingUser) {
      throw new AppError("user is already exists", 404);
    }
    const hashedPassword = await hashPassword(password);

    const newUser = await this.userRepo.createUser(
      firstname,
      lastname ?? null,
      email,
      hashedPassword,
      phoneNumber,
      role ?? "USER",
    );
    const jwtPayload = toJwtPayload(newUser);
    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);
    const hashedRefreshToken = hashRefreshToken(refreshToken);
    await this.userRepo.createRefreshToken({
      token: hashedRefreshToken,
      userId: newUser.id,
      expriesAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      user: toUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  }
  async loginUserService(data: loginUserDTO) {
    const { email, password } = data;
    const exitingUser = await this.userRepo.getUserByEmail(email);
    if (!exitingUser) {
      throw new AppError("Invalid credential", 401);
    }
    const isPasswordCorrect = await comparePassword(
      password,
      exitingUser.password,
    );
    if (!isPasswordCorrect) {
      throw new AppError("Invalid credential", 401);
    }
    const jwtPayload = toJwtPayload(exitingUser);
    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);
    const hashedRefreshToken = hashRefreshToken(refreshToken);
    await this.userRepo.createRefreshToken({
      token: hashedRefreshToken,
      userId: exitingUser.id,
      expriesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    return {
      user: toUserResponse(exitingUser),
      accessToken,
      refreshToken,
    };
  }
  async getCurrentUser(userId: string) {
    const user = await this.userRepo.getUserById(userId);
    console.log("service", user);
    if (!user) {
      throw new AppError("user is not found", 404);
    }
    return toUserResponse(user);
  }
  async logout(data: logoutUserDTO) {
    const { refreshToken } = data;
    const hashedRefreshToken = hashRefreshToken(refreshToken);
    const exitingRefreshToken =
      await this.userRepo.findRefreshToken(hashedRefreshToken);
    if (!exitingRefreshToken) {
      throw new AppError("Invalid refreshToken", 401);
    }
    await this.userRepo.deleteRefreshTokenById(exitingRefreshToken.id);
    return true;
  }
  async logoutAllDevices(userId: string) {
    await this.userRepo.deleteAllRefreshTokenByUserId(userId);
    return true;
  }
  async refreshToken(data: refreshTokenDTO) {
    const { refreshToken } = data;

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken) as IJwtPayLoad;
    } catch (error) {
      throw new AppError("invalid or refresh token is expires", 403);
    }
    const user = await this.userRepo.getUserById(decoded.id);
    if (!user) {
      throw new AppError("Invalid credential", 401);
    }
    const hashedOldRefreshToken = hashRefreshToken(refreshToken);

    const exitingRefreshToken = await this.userRepo.findRefreshToken(
      hashedOldRefreshToken,
    );

    if (!exitingRefreshToken) {
      throw new AppError("refresh token is not found", 404);
    }
    await this.userRepo.deleteRefreshTokenById(exitingRefreshToken.id);
    const newJwtPayload = toJwtPayload(user);
    const newAccessToken = generateAccessToken(newJwtPayload);
    const newRefreshToken = generateRefreshToken(newJwtPayload);
    const hashedRefreshToken = hashRefreshToken(newRefreshToken);

    await this.userRepo.createRefreshToken({
      token: hashedRefreshToken,
      userId: decoded.id,
      expriesAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
