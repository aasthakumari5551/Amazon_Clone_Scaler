export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  subtotal: number;
  total: number;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPin: string;
  createdAt: string;
  items: OrderItem[];
};

export type PlaceOrderPayload = {
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPin: string;
};
