import type { NextFunction, Request, Response } from "express";

import AppError from "../utils/AppError";
import { verifyToken } from "../utils/jwt";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  const payload = verifyToken(token);
  req.user = payload;
  next();
};

export default authenticate;
