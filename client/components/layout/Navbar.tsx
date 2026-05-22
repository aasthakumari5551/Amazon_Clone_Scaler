"use client";

import Link from "next/link";
import NavbarSearch from "./NavbarSearch";
import NavbarCart from "./NavbarCart";
import NavbarUser from "./NavbarUser";

const Navbar = () => {
  return (
    <header className="bg-(--amazon-navy) text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          AMZN
        </Link>
        <NavbarSearch />
        <div className="ml-auto flex items-center gap-4">
          <NavbarUser />
          <Link href="/orders" className="text-sm hover:text-(--amazon-orange)">
            Orders
          </Link>
          <NavbarCart />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
