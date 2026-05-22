import type { Product } from "./product.types";

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  total: number;
};
