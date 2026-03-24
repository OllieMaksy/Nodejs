import { Router } from "express";
import { register, login } from "../controllers/auth.c";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../schemas/auth.chemas";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);