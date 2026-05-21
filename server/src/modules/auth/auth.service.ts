import AppError from "../../utils/AppError";
import { comparePassword, hashPassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";
import type { LoginDto, RegisterDto } from "./auth.dto";
import authRepository from "./auth.repository";

const sanitizeUser = (user: {
  id: string;
  email: string;
  fullName: string;
}) => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName
});

const register = async (dto: RegisterDto) => {
  const existing = await authRepository.findUserByEmail(dto.email);

  if (existing) {
    throw new AppError("Email already in use", 409);
  }

  const passwordHash = await hashPassword(dto.password);
  const user = await authRepository.createUser({ ...dto, passwordHash });

  return sanitizeUser(user);
};

const login = async (dto: LoginDto) => {
  const user = await authRepository.findUserByEmail(dto.email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const match = await comparePassword(dto.password, user.passwordHash);

  if (!match) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    fullName: user.fullName
  });

  return {
    token,
    user: sanitizeUser(user)
  };
};

export default {
  register,
  login
};
