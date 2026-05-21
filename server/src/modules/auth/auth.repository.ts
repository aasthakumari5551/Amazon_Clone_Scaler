import prisma from "../../config/db";
import type { RegisterDto } from "./auth.dto";

const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

const findUserById = (id: string) => prisma.user.findUnique({ where: { id } });

const createUser = (data: RegisterDto & { passwordHash: string }) =>
  prisma.user.create({
    data: {
      email: data.email,
      fullName: data.fullName,
      passwordHash: data.passwordHash
    }
  });

export default {
  findUserByEmail,
  findUserById,
  createUser
};
