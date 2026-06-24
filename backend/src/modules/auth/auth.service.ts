import { Request, Response } from "express";
import { registerUserDTO } from "./auth.sechema.js";
import { IAuthRepository } from "./auth.interface.js";
import { AppError } from "../../utils/AppError.js";
import { hashPassword } from "../../utils/auth.helper.js";
import { toUserResponse } from "./auth.mapper.js";

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
    return {
      user: toUserResponse(newUser),
    };
  }
}
