import { Router } from "express";
import { getAllUsers, getUserById, uploadAvatar, deleteAvatar } from "../controllers/users.c";
import { authM } from "../middleware/auth.m";
import { adminM } from "../middleware/role";
import { upload } from "../middleware/upload";


export const usersRouter = Router();

usersRouter.get("/", authM, adminM, getAllUsers);
usersRouter.get("/me", authM, async (req, res) => {
  res.json({ data: (req as any).user });
});
usersRouter.get("/:id", authM, adminM, getUserById);
usersRouter.post("/me/avatar", authM, upload.single("avatar"), uploadAvatar);
usersRouter.delete("/me/avatar", authM, deleteAvatar);