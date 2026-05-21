import type { Request, Response } from "express";

import asyncWrapper from "../../utils/asyncWrapper";
import authService from "./auth.service";

const register = asyncWrapper(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).json({ user });
});

const login = asyncWrapper(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.status(200).json(result);
});

const me = asyncWrapper(async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});

export default {
  register,
  login,
  me
};
