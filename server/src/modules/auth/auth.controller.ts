import type { Request, Response } from "express";

import asyncWrapper from "../../utils/asyncWrapper";
import { env } from "../../config/env";
import authService from "./auth.service";

const parseExpiryToMs = (value: string) => {
  const match = value.match(/^(\d+)([smhd])$/i);

  if (!match) {
    return undefined;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "s":
      return amount * 1000;
    case "m":
      return amount * 60 * 1000;
    case "h":
      return amount * 60 * 60 * 1000;
    case "d":
      return amount * 24 * 60 * 60 * 1000;
    default:
      return undefined;
  }
};

const register = asyncWrapper(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).json({ user });
});

const login = asyncWrapper(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  const maxAge = parseExpiryToMs(env.JWT_EXPIRES_IN);

  res.cookie("auth_token", result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge
  });
  res.status(200).json(result);
});

const me = asyncWrapper(async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});

const logout = asyncWrapper(async (req: Request, res: Response) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/"
  });
  res.status(200).json({ message: "Logged out" });
});

export default {
  register,
  login,
  me,
  logout
};
