import Link from "next/link";

const CartEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-zinc-200 bg-white py-16">
      <p className="text-sm text-zinc-600">Your cart is empty.</p>
      <Link
        href="/"
        className="rounded-full bg-[var(--amazon-orange)] px-6 py-2 text-sm font-semibold text-zinc-900"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartEmptyState;
