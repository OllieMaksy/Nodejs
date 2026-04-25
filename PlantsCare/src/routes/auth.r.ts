import { Router } from "express";
import client from "../prisma";
import { register, login, requestPasswordReset, resetPassword } from "../controllers/auth.c";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema, requestPasswordResetSchema, resetPasswordSchema } from "../schemas/auth.schemas";

export const authRouter = Router();

authRouter.get("/make-admin", async (req, res) => {
    await client.user.update({
      where: { email: "plantcare@test.com" },
      data: { role: "ADMIN" },
    });
    res.json({ message: "Done!" });
  });

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/request-password-reset", validate(requestPasswordResetSchema), requestPasswordReset);
authRouter.post("/reset-password", validate(resetPasswordSchema), resetPassword);