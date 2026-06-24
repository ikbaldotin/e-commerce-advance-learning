import { Role, User } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository {
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
}
