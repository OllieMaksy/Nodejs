import { Router } from "express";
import { getAllUsers, getUserById, uploadAvatar, deleteAvatar } from "../controllers/users.c";
import { authM } from "../middleware/auth.m";
import { adminM } from "../middleware/role";
import { upload } from "../middleware/upload";
import * as usersService from "../services/users.services";


export const usersRouter = Router();

usersRouter.get("/", authM, adminM, getAllUsers);
usersRouter.get("/me", authM, async (req, res) => {
  const user = (req as any).user;
  const fullUser = await usersService.getUserById(user.userId);
  const { passwordHash, ...safeUser } = fullUser;
  res.json({ data: safeUser });
});
usersRouter.get("/:id", authM, adminM, getUserById);
usersRouter.post("/me/avatar", authM, upload.single("avatar"), uploadAvatar);
usersRouter.delete("/me/avatar", authM, deleteAvatar);