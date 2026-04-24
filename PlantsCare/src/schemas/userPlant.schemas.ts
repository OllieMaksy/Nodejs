import * as z from "zod";
 
export const createUserPlantSchema = z.object({
  plantId: z.string().min(1, "PlantId is required"),
  nickname: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
  wateringFrequencyDays: z.number().int().min(1).max(365).default(7),
});
 
export const updateUserPlantSchema = z.object({
  nickname: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
  lastWater: z.iso.datetime().optional(),
  wateringFrequencyDays: z.number().int().min(1).max(365).optional(),
});
 
export type CreateUserPlantDto = z.infer<typeof createUserPlantSchema>;
export type UpdateUserPlantDto = z.infer<typeof updateUserPlantSchema>;
