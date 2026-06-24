import { Role, User } from "@prisma/client";
import { registerUserDTO } from "./auth.sechema.js";

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
}
