"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { orderService } from "@/services/orderService";
import type { Order } from "@/types/order.types";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorBanner from "@/components/shared/ErrorBanner";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const OrderConfirmationPage = () => {
  const params = useParams();
  const orderId = String(params.orderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const response = await orderService.getOrderById(orderId);
        setOrder(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load order");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  if (!order) {
    return <ErrorBanner message="Order not found" />;
  }

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Order Placed!</h1>
        <p className="text-sm text-zinc-500">Order ID: {order.id}</p>
      </div>
      <div className="space-y-2 text-sm text-zinc-600">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <span>{item.productName}</span>
            <span>{formatCurrency(item.productPrice * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full bg-[var(--amazon-orange)] px-5 py-2 text-sm font-semibold text-zinc-900"
        >
          Continue Shopping
        </Link>
        <Link
          href="/orders"
          className="rounded-full border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-700"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
