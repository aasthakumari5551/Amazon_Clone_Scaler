"use client";

import { create } from "zustand";
import type { Cart } from "@/types/cart.types";

type CartState = {
  items: Cart["items"];
  subtotal: number;
  total: number;
  itemCount: number;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  subtotal: 0,
  total: 0,
  itemCount: 0,
  setCart: (cart) =>
    set({
      items: cart.items,
      subtotal: cart.subtotal,
      total: cart.total,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
    }),
  clearCart: () => set({ items: [], subtotal: 0, total: 0, itemCount: 0 })
}));
