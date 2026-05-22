"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const NavbarCart = () => {
  const { itemCount } = useCartStore();

  return (
    <Link href="/cart" className="relative flex items-center gap-2 text-sm">
      <ShoppingCart className="h-5 w-5" />
      <span>Cart</span>
      {itemCount > 0 ? (
        <span className="absolute -right-3 -top-2 rounded-full bg-(--amazon-orange) px-1.5 text-xs font-semibold text-zinc-900">
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
};

export default NavbarCart;
