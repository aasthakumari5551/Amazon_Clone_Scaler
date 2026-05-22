"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cartService } from "@/services/cartService";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

export const useCart = () => {
  const { isAuthenticated } = useAuthStore();
  const cartStore = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        return;
      }

      setIsLoading(true);
      try {
        const cart = await cartService.getCart();
        cartStore.setCart(cart);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to load cart");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (productId: string, quantity: number) => {
    if (!requireAuth()) {
      return;
    }
    setIsLoading(true);
    try {
      const cart = await cartService.addItem({ productId, quantity });
      cartStore.setCart(cart);
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add item");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!requireAuth()) {
      return;
    }
    setIsLoading(true);
    try {
      const cart = await cartService.updateItem(productId, { quantity });
      cartStore.setCart(cart);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update item");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!requireAuth()) {
      return;
    }
    setIsLoading(true);
    try {
      await cartService.removeItem(productId);
      const cart = await cartService.getCart();
      cartStore.setCart(cart);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...cartStore,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart
  };
};
