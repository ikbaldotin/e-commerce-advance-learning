import { Request, Response } from "express";
import { loginUserDTO, registerUserDTO } from "./auth.sechema.js";
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
} from "../../utils/jwt.helper.js";

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
}
