import { User } from "@prisma/client";
import { userResponseDTO } from "./auth.response.js";

export const toUserResponse = (user: User): userResponseDTO => {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
