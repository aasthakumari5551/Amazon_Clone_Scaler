import type { NextFunction, Request, Response } from "express";

const asyncWrapper =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };

export default asyncWrapper;
