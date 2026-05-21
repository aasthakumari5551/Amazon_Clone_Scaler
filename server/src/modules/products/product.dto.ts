import { z } from "zod";

export const productQuerySchema = z.object({
  search: z.string().min(1).optional(),
  categoryId: z.string().uuid().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional()
});

export type ProductQueryDto = z.infer<typeof productQuerySchema>;
