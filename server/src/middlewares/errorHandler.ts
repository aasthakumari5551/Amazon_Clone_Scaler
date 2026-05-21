import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { Prisma } from "../../generated/prisma/client";
import AppError from "../utils/AppError";

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.flatten().fieldErrors
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return res.status(409).json({ message: "Resource already exists" });
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  return res.status(500).json({ message });
};

export default errorHandler;
