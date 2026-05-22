"use client";

import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import CartEmptyState from "@/components/cart/CartEmptyState";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const router = useRouter();
  const { items, subtotal, total, updateQuantity, removeFromCart } = useCart();

  return (
    <ProtectedRoute>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <CartEmptyState />
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>
        <CartSummary
          subtotal={subtotal}
          total={total}
          onCheckout={() => router.push("/checkout")}
        />
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;
