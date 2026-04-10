import { Request, Response } from "express";
import { createUserSchema } from "../schemas/users.schemas";
import * as usersService from "../services/users.services";
import fs from "fs";
import path from "path";
type IdParams = { id: string };


export async function getAllUsers(req: Request, res: Response) {
  const users = await usersService.getAllUsers();
  res.json({ data: users });
}

export async function getUserById(req: Request<IdParams>, res: Response) {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.json({ data: user });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const parsed = createUserSchema.parse(req.body);
    const user = await usersService.createUser(parsed);
    res.status(201).json({ data: user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


export async function uploadAvatar(req: Request, res: Response) {
  try {
    const user = (req as any).user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const existingUser = await usersService.getUserById(user.userId);

    if (existingUser.avatarUrl) {
      const oldPath = path.join(process.cwd(), existingUser.avatarUrl);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const avatarUrl = `/uploads/avatars/${file.filename}`;
    await usersService.updateAvatar(user.userId, avatarUrl);

    res.json({ message: "Аватарку успішно оновлено.", avatarUrl });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteAvatar(req: Request, res: Response) {
  try {
    const user = (req as any).user;

    const existingUser = await usersService.getUserById(user.userId);

    if (!existingUser.avatarUrl) {
      return res.status(404).json({ error: "Avatar not found" });
    }

    const oldPath = path.join(process.cwd(), existingUser.avatarUrl);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    await usersService.updateAvatar(user.userId, null);

    res.json({ message: "Аватарку видалено." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}