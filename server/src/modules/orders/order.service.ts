import { Prisma } from "../../../generated/prisma/client";
import AppError from "../../utils/AppError";
import cartRepository from "../cart/cart.repository";
import type { PlaceOrderDto } from "./order.dto";
import orderRepository from "./order.repository";

const computeTotals = (items: Array<{ quantity: number; product: { price: Prisma.Decimal } }>) => {
  const subtotalValue = items.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  const subtotal = new Prisma.Decimal(subtotalValue.toFixed(2));
  const total = new Prisma.Decimal(subtotalValue.toFixed(2));

  return { subtotal, total };
};

const placeOrder = async (userId: string, dto: PlaceOrderDto) => {
  await cartRepository.getOrCreateCart(userId);
  const cart = await cartRepository.getCartWithItems(userId);

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new AppError("Insufficient stock", 400);
    }
  }

  const { subtotal, total } = computeTotals(cart.items);

  const order = await orderRepository.createOrder(
    userId,
    dto,
    cart.id,
    cart.items,
    subtotal,
    total
  );

  if (!order) {
    throw new AppError("Order creation failed", 500);
  }

  return order;
};

const getOrderHistory = (userId: string) => orderRepository.findOrdersByUser(userId);

const getOrderById = async (orderId: string, userId: string) => {
  const order = await orderRepository.findOrderById(orderId, userId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

export default {
  placeOrder,
  getOrderHistory,
  getOrderById
};
