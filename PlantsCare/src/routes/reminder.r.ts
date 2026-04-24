import { Router } from "express";
import { getTodayReminders } from "../controllers/carelog.c";
import { authM } from "../middleware/auth.m";
 
export const reminderRouter = Router();
reminderRouter.get("/today", authM, getTodayReminders);
 