import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
} from "../controllers/users.c";

export const usersRouter = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/", createUser);
