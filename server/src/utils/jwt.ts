import jwt from "jsonwebtoken";

import { env } from "../config/env";

export type JwtPayload = {
  id: string;
  email: string;
  fullName: string;
};

export const signToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  return decoded as JwtPayload;
};
