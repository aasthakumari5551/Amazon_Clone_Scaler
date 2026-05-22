import { Router } from "express";

import authenticate from "../../middlewares/authenticate";
import validate from "../../middlewares/validate";
import authController from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.dto";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/me", authenticate, authController.me);

export default authRouter;
