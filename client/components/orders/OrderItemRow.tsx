import { formatCurrency } from "@/lib/utils";
import type { OrderItem } from "@/types/order.types";

type OrderItemRowProps = {
  item: OrderItem;
};

const OrderItemRow = ({ item }: OrderItemRowProps) => {
  return (
    <div className="flex items-center justify-between text-sm text-zinc-600">
      <div>
        <p className="font-medium text-zinc-900">{item.productName}</p>
        <p className="text-xs">Qty {item.quantity}</p>
      </div>
      <span>{formatCurrency(item.productPrice * item.quantity)}</span>
    </div>
  );
};

export default OrderItemRow;
