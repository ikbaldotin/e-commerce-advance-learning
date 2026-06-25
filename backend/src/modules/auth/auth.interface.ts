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
}
