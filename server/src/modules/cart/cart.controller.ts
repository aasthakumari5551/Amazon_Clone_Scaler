import type { Request, Response } from "express";

import asyncWrapper from "../../utils/asyncWrapper";
import cartService from "./cart.service";

const getCart = asyncWrapper(async (req: Request, res: Response) => {
  const cart = await cartService.getCart(req.user!.id);
  res.status(200).json(cart);
});

const addItem = asyncWrapper(async (req: Request, res: Response) => {
  const cart = await cartService.addItem(req.user!.id, req.body);
  res.status(200).json(cart);
});

const updateItem = asyncWrapper(async (req: Request, res: Response) => {
  const cart = await cartService.updateItem(req.user!.id, req.params.productId, req.body);
  res.status(200).json(cart);
});

const removeItem = asyncWrapper(async (req: Request, res: Response) => {
  await cartService.removeItem(req.user!.id, req.params.productId);
  res.status(204).send();
});

export default {
  getCart,
  addItem,
  updateItem,
  removeItem
};
