import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type CartSummaryProps = {
  subtotal: number;
  total: number;
  onCheckout: () => void;
};

const CartSummary = ({ subtotal, total, onCheckout }: CartSummaryProps) => {
  return (
    <div className="rounded-md border border-zinc-200 bg-white p-4">
      <div className="flex items-start gap-2 text-xs text-emerald-600">
        <span className="mt-0.5 h-4 w-4 rounded-full border border-emerald-600 text-center text-[10px]">
          ✓
        </span>
        <div>
          <div className="font-semibold">Your order is eligible for FREE Delivery.</div>
          <div className="text-zinc-500">Choose FREE Delivery option at checkout.</div>
        </div>
      </div>
      <div className="mt-4 text-lg font-semibold text-zinc-900">
        Subtotal ({total > 0 ? 1 : 0} item): {formatCurrency(subtotal)}
      </div>
      <label className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
        <input type="checkbox" className="h-3 w-3" />
        This order contains a gift
      </label>
      <Button
        onClick={onCheckout}
        className="mt-4 w-full rounded-full bg-[#ffd814] text-xs font-semibold text-zinc-900 hover:bg-[#f7ca00]"
      >
        Proceed to Buy
      </Button>
    </div>
  );
};

export default CartSummary;
