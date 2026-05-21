import { Router } from "express";

import productController from "./product.controller";

const productRouter = Router();

productRouter.get("/categories", productController.getCategories);
productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);

export default productRouter;
