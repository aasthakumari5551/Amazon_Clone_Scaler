"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AddressForm from "@/components/checkout/AddressForm";
import OrderReviewPanel from "@/components/checkout/OrderReviewPanel";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useCart } from "@/hooks/useCart";
import { orderService } from "@/services/orderService";
import type { PlaceOrderPayload } from "@/types/order.types";
import { toast } from "sonner";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, subtotal, total } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: PlaceOrderPayload) => {
    setIsSubmitting(true);
    try {
      const order = await orderService.placeOrder(data);
      toast.success("Order placed!");
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full px-3 py-4">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <AddressForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          <OrderReviewPanel cart={{ id: "", userId: "", items, subtotal, total }} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPage;
