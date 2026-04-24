import { Request, Response } from "express";
import {
  createUserPlantSchema,
  updateUserPlantSchema,
} from "../schemas/userPlant.schemas";
import * as userPlantService from "../services/userPlant.services";

type IdParams = { id: string };

function getUserId(req: Request): string {
  return (req as any).user.userId;
}

export async function getUserPlants(req: Request, res: Response) {
  try {
    const userId = getUserId(req);
    const plants = await userPlantService.getUserPlants(userId);
    res.json({ data: plants });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUserPlantById(req: Request<IdParams>, res: Response) {
  try {
    const userId = getUserId(req);
    const plant = await userPlantService.getUserPlantById(req.params.id, userId);
    res.json({ data: plant });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}


export async function createUserPlant(req: Request, res: Response) {
  try {
    const userId = getUserId(req);
    const parsed = createUserPlantSchema.parse(req.body);
    const plant = await userPlantService.createUserPlant(userId, parsed);
    res.status(201).json({ data: plant });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


export async function updateUserPlant(req: Request<IdParams>, res: Response) {
  try {
    const userId = getUserId(req);
    const parsed = updateUserPlantSchema.parse(req.body);
    const plant = await userPlantService.updateUserPlant(req.params.id, userId, parsed);
    res.json({ data: plant });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


export async function deleteUserPlant(req: Request<IdParams>, res: Response) {
  try {
    const userId = getUserId(req);
    await userPlantService.deleteUserPlant(req.params.id, userId);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}