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
      <div className="w-full px-3 py-4">
        <div className="grid gap-4 lg:grid-cols-[3fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-md bg-white p-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div>
                <h1 className="text-2xl font-semibold text-zinc-900">Shopping Cart</h1>
                <button className="mt-1 text-xs text-blue-700">Deselect all items</button>
              </div>
              <span className="text-sm text-zinc-500">Price</span>
            </div>
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

          <div className="rounded-md bg-white p-4">
            <h2 className="text-lg font-semibold text-zinc-900">Your Items</h2>
            <div className="mt-3 flex gap-4 text-sm">
              <button className="border-b-2 border-blue-700 pb-1 font-semibold text-blue-700">
                Buy it again
              </button>
              <button className="pb-1 text-zinc-500">No items saved for later</button>
            </div>
            <div className="mt-4 rounded-md border border-zinc-200 p-4 text-sm text-zinc-500">
              No items
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CartSummary
            subtotal={subtotal}
            total={total}
            onCheckout={() => router.push("/checkout")}
          />
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
};

export default CartPage;
