import type { Order, PlaceOrderPayload } from "@/types/order.types";
import { api } from "./api";

export const orderService = {
  placeOrder: (payload: PlaceOrderPayload) => api.post<Order>("/orders", payload),
  getOrders: () => api.get<Order[]>("/orders"),
  getOrderById: (orderId: string) => api.get<Order>(`/orders/${orderId}`)
};
