import type { Cart } from "@/types/cart.types";
import { api } from "./api";

export const cartService = {
  getCart: () => api.get<Cart>("/cart"),
  addItem: (payload: { productId: string; quantity: number }) => api.post<Cart>("/cart/items", payload),
  updateItem: (productId: string, payload: { quantity: number }) =>
    api.patch<Cart>(`/cart/items/${productId}`, payload),
  removeItem: (productId: string) => api.del<void>(`/cart/items/${productId}`)
};
