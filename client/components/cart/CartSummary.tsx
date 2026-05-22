import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type CartSummaryProps = {
  subtotal: number;
  total: number;
  onCheckout: () => void;
};

const CartSummary = ({ subtotal, total, onCheckout }: CartSummaryProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-zinc-900">Order Summary</h3>
      <div className="mt-4 space-y-2 text-sm text-zinc-600">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated Total</span>
          <span className="font-semibold text-zinc-900">{formatCurrency(total)}</span>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        className="mt-6 w-full bg-[var(--amazon-orange)] text-zinc-900 hover:bg-[#f6a52b]"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
