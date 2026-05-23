import Link from "next/link";

const CartEmptyState = () => {
  return (
    <div className="rounded-md bg-white p-6 text-sm text-zinc-600">
      <p>Your cart is empty.</p>
      <Link
        href="/"
        className="mt-3 inline-block rounded-full bg-[#ffd814] px-6 py-2 text-xs font-semibold text-zinc-900"
      >
        Continue shopping
      </Link>
    </div>
  );
};

export default CartEmptyState;
