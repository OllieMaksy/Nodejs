import { Request, Response } from "express";
import { createCareLogSchema, createReminderSchema } from "../schemas/carelog.schemas";
import * as careLogService from "../services/carelog.services";

type IdParams = { id: string };

function getUserId(req: Request): string {
  return (req as any).user.userId;
}

export async function waterPlant(req: Request<IdParams>, res: Response) {
  try {
    const userId = getUserId(req);
    const result = await careLogService.waterPlant(req.params.id, userId);
    res.json({ data: result });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function getCareLogs(req: Request<IdParams>, res: Response) {
  try {
    const userId = getUserId(req);
    const logs = await careLogService.getCareLogs(req.params.id, userId);
    res.json({ data: logs });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function createCareLog(req: Request<IdParams>, res: Response) {
  try {
    const userId = getUserId(req);
    const parsed = createCareLogSchema.parse(req.body);
    const log = await careLogService.createCareLog(req.params.id, userId, parsed);
    res.status(201).json({ data: log });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function createReminder(req: Request<IdParams>, res: Response) {
  try {
    const userId = getUserId(req);
    const parsed = createReminderSchema.parse(req.body);
    const reminder = await careLogService.createReminder(req.params.id, userId, parsed);
    res.status(201).json({ data: reminder });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getReminders(req: Request<IdParams>, res: Response) {
  try {
    const userId = getUserId(req);
    const reminders = await careLogService.getReminders(req.params.id, userId);
    res.json({ data: reminders });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function getTodayReminders(req: Request, res: Response) {
  try {
    const userId = getUserId(req);
    const reminders = await careLogService.getTodayReminders(userId);
    res.json({ data: reminders });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}