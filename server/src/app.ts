import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import corsOptions from "./config/corsOptions";
import authRouter from "./modules/auth/auth.router";
import productRouter from "./modules/products/product.router";
import cartRouter from "./modules/cart/cart.router";
import orderRouter from "./modules/orders/order.router";
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
