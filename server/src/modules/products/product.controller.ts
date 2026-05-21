import type { Request, Response } from "express";

import asyncWrapper from "../../utils/asyncWrapper";
import AppError from "../../utils/AppError";
import { productQuerySchema } from "./product.dto";
import productService from "./product.service";

const getProducts = asyncWrapper(async (req: Request, res: Response) => {
  const parsed = productQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    throw new AppError("Invalid query", 400);
  }

  const result = await productService.getProducts(parsed.data);
  res.status(200).json(result);
});

const getProductById = asyncWrapper(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json(product);
});

const getCategories = asyncWrapper(async (req: Request, res: Response) => {
  const categories = await productService.getCategories();
  res.status(200).json(categories);
});

export default {
  getProducts,
  getProductById,
  getCategories
};
