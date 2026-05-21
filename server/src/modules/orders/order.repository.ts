import prisma from "../../config/db";
import type { PlaceOrderDto } from "./order.dto";
import type { Prisma } from "../../../generated/prisma/client";

const createOrder = async (
  userId: string,
  dto: PlaceOrderDto,
  cartId: string,
  cartItems: Array<{ productId: string; quantity: number; product: { name: string; price: Prisma.Decimal } }>,
  subtotal: Prisma.Decimal,
  total: Prisma.Decimal
) => {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        status: "PENDING",
        subtotal,
        total,
        shippingName: dto.shippingName,
        shippingAddress: dto.shippingAddress,
        shippingCity: dto.shippingCity,
        shippingState: dto.shippingState,
        shippingPin: dto.shippingPin
      }
    });

    await tx.orderItem.createMany({
      data: cartItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        productName: item.product.name,
        productPrice: item.product.price,
        quantity: item.quantity
      }))
    });

    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId } });

    return tx.order.findUnique({
      where: { id: order.id },
      include: { items: true }
    });
  });
};

const findOrdersByUser = (userId: string) =>
  prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });

const findOrderById = (orderId: string, userId: string) =>
  prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: true }
  });

export default {
  createOrder,
  findOrdersByUser,
  findOrderById
};
