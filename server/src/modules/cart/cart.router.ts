import { Router } from "express";

import authenticate from "../../middlewares/authenticate";
import validate from "../../middlewares/validate";
import cartController from "./cart.controller";
import { addToCartSchema, updateCartItemSchema } from "./cart.dto";

const cartRouter = Router();

cartRouter.use(authenticate);

cartRouter.get("/", cartController.getCart);
cartRouter.post("/items", validate(addToCartSchema), cartController.addItem);
cartRouter.patch("/items/:productId", validate(updateCartItemSchema), cartController.updateItem);
cartRouter.delete("/items/:productId", cartController.removeItem);

export default cartRouter;
