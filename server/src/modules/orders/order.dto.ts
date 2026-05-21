import { z } from "zod";

export const placeOrderSchema = z.object({
  shippingName: z.string().min(1),
  shippingAddress: z.string().min(1),
  shippingCity: z.string().min(1),
  shippingState: z.string().min(1),
  shippingPin: z.string().min(1)
});

export type PlaceOrderDto = z.infer<typeof placeOrderSchema>;
