import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/users.c";
import { authM } from "../middleware/auth.m";
import { adminM } from "../middleware/role";

export const usersRouter = Router();

usersRouter.get("/", authM, adminM, getAllUsers);
usersRouter.get("/me", authM, async (req, res) => {
  res.json({ data: (req as any).user });
});
usersRouter.get("/:id", authM, adminM, getUserById);