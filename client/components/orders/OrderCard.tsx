import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order } from "@/types/order.types";
import OrderItemRow from "./OrderItemRow";

const statusColors: Record<Order["status"], string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700"
};

type OrderCardProps = {
  order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">Order</p>
          <p className="text-sm font-semibold text-zinc-900">{order.id.slice(0, 8)}...</p>
          <p className="text-xs text-zinc-500">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${statusColors[order.status]}`}>
          {order.status}
        </span>
        <div className="text-right">
          <p className="text-xs text-zinc-500">Total</p>
          <p className="text-sm font-semibold text-zinc-900">{formatCurrency(order.total)}</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {order.items.map((item) => (
          <OrderItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
