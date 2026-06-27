import { RefreshToken, Role, User } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository {
  async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  async createUser(
    firstname: string,
    lastname: string | null,
    email: string,
    password: string,
    phoneNumber: string,
    role: Role,
  ): Promise<User> {
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        role,
      },
    });
    return user;
  }
  async createRefreshToken(data: {
    token: string;
    userId: string;
    expriesAt: Date;
  }) {
    const token = await prisma.refreshToken.create({
      data,
    });
    return token;
  }
  async findRefreshToken(
    hashedRefreshToken: string,
  ): Promise<RefreshToken | null> {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        token: hashedRefreshToken,
      },
    });
    return refreshToken;
  }
  async deleteRefreshTokenById(refreshTokenId: string): Promise<any> {
    await prisma.refreshToken.delete({
      where: {
        id: refreshTokenId,
      },
    });
  }
  async deleteAllRefreshTokenByUserId(userId: string): Promise<any> {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
