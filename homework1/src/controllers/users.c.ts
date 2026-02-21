import { Request, Response } from "express";
import { createUserSchema } from "../schemas/users.schemas";
import * as usersService from "../services/users.services";
type IdParams = { id: string };

export function getAllUsers(req: Request, res: Response) {
  const users = usersService.getAllUsers();
  res.json({ data: users });
}

export function getUserById(req: Request<IdParams>, res: Response) {
  try {
    const user = usersService.getUserById(req.params.id);
    res.json({ data: user });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export function createUser(req: Request, res: Response) {
  try {
    const parsed = createUserSchema.parse(req.body);
    const user = usersService.createUser(parsed);
    res.status(201).json({ data: user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}