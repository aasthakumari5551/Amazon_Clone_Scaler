"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const NavbarCart = () => {
  const { itemCount } = useCartStore();

  return (
    <Link href="/cart" className="relative flex items-center gap-2 text-xs">
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 ? (
          <span className="absolute -right-2 -top-2 rounded-full bg-(--amazon-orange) px-1.5 text-[10px] font-semibold text-zinc-900">
            {itemCount}
          </span>
        ) : null}
      </div>
      <span className="hidden font-semibold text-white md:inline">Cart</span>
    </Link>
  );
};

export default NavbarCart;
