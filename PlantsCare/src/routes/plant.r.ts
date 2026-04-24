import { Router } from "express";
import { getAllPlants, getPlantById, getPlantByName, getPlantsByCategory, createPlant, updatePlant, deletePlant } from "../controllers/plant.c";
import { authM } from "../middleware/auth.m";
import { adminM } from "../middleware/role";

export const plantRouter = Router();

plantRouter.get("/", getAllPlants);
plantRouter.get("/name/:name", getPlantByName);
plantRouter.get("/species/:name", getPlantsByCategory);
plantRouter.get("/:id", getPlantById);

plantRouter.post("/", authM, adminM, createPlant);
plantRouter.put("/:id", authM, adminM, updatePlant);
plantRouter.delete("/:id", authM, adminM, deletePlant);