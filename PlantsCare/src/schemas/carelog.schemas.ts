import * as z from "zod";

export const createCareLogSchema = z.object({
  type: z.enum(["watering", "fertilizing", "repotting", "other"]),
  notes: z.string().max(500).optional(),
});

export const createReminderSchema = z.object({
  type: z.enum(["watering", "fertilizing", "repotting", "other"]),
  remindAt: z.iso.datetime("Invalid date format. Use ISO: 2026-04-24T10:00:00Z"),
});

export const updateReminderSchema = z.object({
  done: z.boolean().optional(),
  remindAt: z.iso.datetime().optional(),
});

export type CreateCareLogDto = z.infer<typeof createCareLogSchema>;
export type CreateReminderDto = z.infer<typeof createReminderSchema>;
export type UpdateReminderDto = z.infer<typeof updateReminderSchema>;