import { Request, Response } from "express";
import client from "../prisma";
import {
    createPlantSchema,
    updatePlantSchema,
    plantQuerySchema,
} from "../schemas/plant.schemas";
import * as plantService from "../services/plant.services";

type IdParams = { id: string };
type NameParams = { name: string };
type SpeciesParams = { species: string };

export async function getAllPlants(req: Request, res: Response) {
  try {
    const query = plantQuerySchema.parse(req.query);
    const result = await plantService.getAllPlants(query);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
export async function getPlantById(req: Request<IdParams>, res: Response) {
  try {
    const plant = await plantService.getPlantById(req.params.id);
    res.json({ data: plant });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function getPlantByName(req: Request<NameParams>, res: Response) {
  try {
    const plant = await plantService.getPlantByName(req.params.name);;
    res.json({ data: plant });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function getPlantsByCategory(req: Request<SpeciesParams>, res: Response) {
  try {
    const plants = await plantService.getPlantsByCategory(req.params.species);
    
    res.json({ data: plants });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}
export async function createPlant(req: Request, res: Response) {
  try {
    const parsed = createPlantSchema.parse(req.body);
    const plant = await plantService.createPlant(parsed);
    res.status(201).json({ data: plant });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function updatePlant(req: Request<IdParams>, res: Response) {
  try {
    const parsed = updatePlantSchema.parse(req.body);
    const plant = await plantService.updatePlant(req.params.id, parsed);
    res.json({ data: plant });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deletePlant(req: Request<IdParams>, res: Response) {
  try {
    plantService.deletePlant(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}