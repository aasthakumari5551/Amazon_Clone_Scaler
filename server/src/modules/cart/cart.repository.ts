import prisma from "../../config/db";

const getOrCreateCart = async (userId: string) => {
  const existing = await prisma.cart.findUnique({ where: { userId } });

  if (existing) {
    return existing;
  }

  return prisma.cart.create({ data: { userId } });
};

const getCartWithItems = (userId: string) =>
  prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: { orderBy: { sortOrder: "asc" }, take: 1 },
              category: true
            }
          }
        }
      }
    }
  });

const upsertCartItem = (cartId: string, productId: string, quantity: number) =>
  prisma.cartItem.upsert({
    where: { cartId_productId: { cartId, productId } },
    update: { quantity },
    create: { cartId, productId, quantity }
  });

const updateCartItemQuantity = (cartId: string, productId: string, quantity: number) =>
  prisma.cartItem.update({
    where: { cartId_productId: { cartId, productId } },
    data: { quantity }
  });

const removeCartItem = (cartId: string, productId: string) =>
  prisma.cartItem.delete({
    where: { cartId_productId: { cartId, productId } }
  });

const clearCart = (cartId: string) => prisma.cartItem.deleteMany({ where: { cartId } });

export default {
  getOrCreateCart,
  getCartWithItems,
  upsertCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
};
