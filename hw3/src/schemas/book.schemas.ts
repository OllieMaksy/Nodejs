import * as z from "zod";

export const createBookSchema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title must be less than 200 characters"),
  
    author: z
      .string()
      .min(1, "Author is required")
      .max(200, "Author must be less than 200 characters"),
  
    year: z
      .number()
      .int("Year must be an integer")
      .min(0, "Year must be positive"),
  
    isbn: z
      .string()
      .min(1, "ISBN is required"),
  });

export const replaceBookSchema = z.object({
    title: z
      .string()
      .min(1)
      .max(200),
  
    author: z
      .string()
      .min(1)
      .max(200),
  
    year: z
      .number()
      .int()
      .min(0),
  
    isbn: z
      .string()
      .min(1),
  
    available: z.boolean(),
});

export const updateBookSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    author: z.string().min(1).max(200).optional(),
    year: z.number().int().min(0).optional(),
    isbn: z.string().min(1).optional(),
    available: z.boolean().optional(),
  });
  
  export type CreateBookDto = z.infer<typeof createBookSchema>;
  export type ReplaceBookDto = z.infer<typeof replaceBookSchema>;
  export type UpdateBookDto = z.infer<typeof updateBookSchema>;