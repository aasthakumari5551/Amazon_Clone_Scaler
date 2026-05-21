import { Router } from "express";

import authenticate from "../../middlewares/authenticate";
import validate from "../../middlewares/validate";
import orderController from "./order.controller";
import { placeOrderSchema } from "./order.dto";

const orderRouter = Router();

orderRouter.use(authenticate);

orderRouter.post("/", validate(placeOrderSchema), orderController.placeOrder);
orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:id", orderController.getOrderById);

export default orderRouter;
