import { spec } from "node:test/reporters";
import * as z from "zod";

export const createPlantSchema = z.object({
  name: z
        .string()
        .min(1, "Name is required")
        .max(100),

   species: 
            z.string()
            .min(1)
            .max(200),
        
   description: z
        .string()
        .min(1, "description is required")
        .max(100),

  lightning: z
        .string()
        .min(1, "Light requirement is required")
        .max(100),


  watering: z
        .string()
        .min(1, "water requirement is required")
        .max(100),

        
  temperature: z
        .string()
        .min(1, "Temperature range is required")
        .max(100),

 transplanting: z
        .string()
        .min(1, "transplanting is required")
        .max(100),

});



export const updatePlantSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    species: z.string().min(1).max(200).optional(),
    description: z.string().min(1).max(200).optional(),
    lightning: z.string().min(1).max(200).optional(),
    watering: z.string().min(1).max(200).optional(),
    temperature: z.string().min(1).max(200).optional(),
    transplanting: z.string().min(1).max(200).optional(),
  });
  

export const plantQuerySchema = z.object({
      page: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 1))
        .pipe(z.number().min(1, "Page must be at least 1")),
     
      limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 10))
        .pipe(z.number().min(1).max(100, "Limit cannot exceed 100")),
     
      name: z.string().optional(),   // для пошуку за іменем
    });

export type CreatePlantDto = z.infer<typeof createPlantSchema>;
export type UpdatePlantDto = z.infer<typeof updatePlantSchema>;
export type PlantQueryDto = z.infer<typeof plantQuerySchema>;
