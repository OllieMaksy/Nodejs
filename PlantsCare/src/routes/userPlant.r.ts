import { Router } from "express";
import {
  getUserPlants,
  getUserPlantById,
  createUserPlant,
  updateUserPlant,
  deleteUserPlant,
} from "../controllers/userPlant.c";
import { authM } from "../middleware/auth.m";

export const userPlantRouter = Router();
userPlantRouter.use(authM);

userPlantRouter.get("/", getUserPlants);
userPlantRouter.get("/:id", getUserPlantById);
userPlantRouter.post("/", createUserPlant);
userPlantRouter.patch("/:id", updateUserPlant);
userPlantRouter.delete("/:id", deleteUserPlant);