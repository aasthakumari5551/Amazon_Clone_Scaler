import { z } from "zod";

export const productQuerySchema = z.object({
  search: z.string().min(1).optional(),
  categoryId: z.string().uuid().optional(),
  brands: z.string().min(1).optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  ratingMin: z.coerce.number().positive().optional(),
  freeDelivery: z.coerce.boolean().optional(),
  discount: z.coerce.boolean().optional(),
  condition: z.enum(["NEW", "RENEWED", "USED"]).optional(),
  sort: z.enum(["featured", "price_low", "price_high", "rating", "newest"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional()
});

export type ProductQueryDto = z.infer<typeof productQuerySchema>;
