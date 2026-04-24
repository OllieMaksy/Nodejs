import { Router } from "express";
import {
  waterPlant,
  getCareLogs,
  createCareLog,
  createReminder,
  getReminders,
} from "../controllers/carelog.c";
import { authM } from "../middleware/auth.m";
export const careLogRouter = Router({ mergeParams: true });

careLogRouter.use(authM);
careLogRouter.post("/water", waterPlant);

careLogRouter.get("/logs", getCareLogs);
careLogRouter.post("/logs", createCareLog);

careLogRouter.get("/reminders", getReminders);
careLogRouter.post("/reminders", createReminder);