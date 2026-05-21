import AppError from "../../utils/AppError";
import cartRepository from "./cart.repository";
import prisma from "../../config/db";
import type { AddToCartDto, UpdateCartItemDto } from "./cart.dto";

const computeTotals = (items: Array<{ quantity: number; product: { price: unknown } }>) => {
  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  const total = subtotal;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    total: Number(total.toFixed(2))
  };
};

const getCart = async (userId: string) => {
  await cartRepository.getOrCreateCart(userId);
  const cart = await cartRepository.getCartWithItems(userId);

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const totals = computeTotals(cart.items);

  return {
    ...cart,
    ...totals
  };
};

const addItem = async (userId: string, dto: AddToCartDto) => {
  const product = await prisma.product.findUnique({ where: { id: dto.productId } });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock < dto.quantity) {
    throw new AppError("Insufficient stock", 400);
  }

  const cart = await cartRepository.getOrCreateCart(userId);
  await cartRepository.upsertCartItem(cart.id, dto.productId, dto.quantity);

  return getCart(userId);
};

const updateItem = async (userId: string, productId: string, dto: UpdateCartItemDto) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock < dto.quantity) {
    throw new AppError("Insufficient stock", 400);
  }

  const cart = await cartRepository.getOrCreateCart(userId);
  await cartRepository.updateCartItemQuantity(cart.id, productId, dto.quantity);

  return getCart(userId);
};

const removeItem = async (userId: string, productId: string) => {
  const cart = await cartRepository.getOrCreateCart(userId);
  await cartRepository.removeCartItem(cart.id, productId);
};

export default {
  getCart,
  addItem,
  updateItem,
  removeItem
};
