import type { Cart } from "@/types/cart.types";
import { formatCurrency } from "@/lib/utils";

type OrderReviewPanelProps = {
  cart: Cart;
};

const OrderReviewPanel = ({ cart }: OrderReviewPanelProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-zinc-900">Order Review</h3>
      <div className="mt-4 space-y-3">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium text-zinc-900">{item.product.name}</p>
              <p className="text-xs text-zinc-500">Qty {item.quantity}</p>
            </div>
            <span>{formatCurrency(Number(item.product.price) * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-zinc-200 pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(cart.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between font-semibold text-zinc-900">
          <span>Total</span>
          <span>{formatCurrency(cart.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderReviewPanel;
