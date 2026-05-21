import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const parsed = schema.parse(req.body);
  req.body = parsed;
  next();
};

export default validate;
