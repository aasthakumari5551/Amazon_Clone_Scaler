import type { Request, Response } from "express";

import asyncWrapper from "../../utils/asyncWrapper";
import orderService from "./order.service";

const placeOrder = asyncWrapper(async (req: Request, res: Response) => {
  const order = await orderService.placeOrder(req.user!.id, req.body);
  res.status(201).json(order);
});

const getOrders = asyncWrapper(async (req: Request, res: Response) => {
  const orders = await orderService.getOrderHistory(req.user!.id);
  res.status(200).json(orders);
});

const getOrderById = asyncWrapper(async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(req.params.id, req.user!.id);
  res.status(200).json(order);
});

export default {
  placeOrder,
  getOrders,
  getOrderById
};
