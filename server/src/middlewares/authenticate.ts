import type { NextFunction, Request, Response } from "express";

import AppError from "../utils/AppError";
import { verifyToken } from "../utils/jwt";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "").trim()
    : undefined;
  const cookieToken = req.cookies?.auth_token;
  const token = bearerToken ?? cookieToken;

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = verifyToken(token);
  req.user = payload;
  next();
};

export default authenticate;
