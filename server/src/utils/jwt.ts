import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

export type JwtPayload = {
  id: string;
  email: string;
  fullName: string;
};

export const signToken = (payload: JwtPayload) => {
  const expiresIn = env.JWT_EXPIRES_IN as SignOptions["expiresIn"];
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  return decoded as JwtPayload;
};
