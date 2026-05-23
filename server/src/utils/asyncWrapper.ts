import type { NextFunction, Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

type AsyncHandler<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = ParsedQs,
  LocalsObj extends Record<string, unknown> = Record<string, unknown>
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery, LocalsObj>,
  res: Response<ResBody, LocalsObj>,
  next: NextFunction
) => Promise<void> | void;

const asyncWrapper =
  <
    P = ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = ParsedQs,
    LocalsObj extends Record<string, unknown> = Record<string, unknown>
  >(
    handler: AsyncHandler<P, ResBody, ReqBody, ReqQuery, LocalsObj>
  ) =>
  (req: Request<P, ResBody, ReqBody, ReqQuery, LocalsObj>, res: Response<ResBody, LocalsObj>, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };

export default asyncWrapper;
