import { RefreshToken, Role, User } from "@prisma/client";

export interface IAuthRepository {
  getUserByEmail(email: string): Promise<User | null>;
  createUser(
    firstname: string,
    lastname: string | null,
    email: string,
    password: string,
    phoneNumber: string,
    role: Role,
  ): Promise<User>;
  createRefreshToken(data: {
    token: string;
    userId: string;
    expriesAt: Date;
  }): Promise<RefreshToken>;

  getUserById(userId: string): Promise<User | null>;
  findRefreshToken(hashedRefreshToken: string): Promise<RefreshToken | null>;
  deleteRefreshTokenById(refreshTokenId: string): Promise<any>;
  deleteAllRefreshTokenByUserId(userId: string): Promise<any>;
}
