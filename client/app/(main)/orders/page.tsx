"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useOrders } from "@/hooks/useOrders";
import OrderCard from "@/components/orders/OrderCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorBanner from "@/components/shared/ErrorBanner";

const OrdersPage = () => {
  const { orders, isLoading, error } = useOrders();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  return (
    <ProtectedRoute>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
            No orders yet.
          </div>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </ProtectedRoute>
  );
};

export default OrdersPage;
