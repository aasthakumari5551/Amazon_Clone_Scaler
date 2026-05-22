"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Globe, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import NavbarSearch from "./NavbarSearch";
import NavbarCart from "./NavbarCart";
import NavbarUser from "./NavbarUser";

const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="bg-(--amazon-navy) text-white">
      <div className="flex h-16 w-full items-center gap-4 px-6">
        <Link href="/" className="flex items-end gap-1">
          <Image
            src="/brand/no_bg_logo.svg"
            alt="amzon"
            width={96}
            height={32}
            className="h-8 w-auto brightness-0 invert"
            priority
          />
        </Link>

        <div className="hidden items-center gap-2 text-xs text-zinc-200 md:flex">
          <MapPin className="h-4 w-4" />
          <div className="leading-tight">
            <div className="text-[10px] text-zinc-300">
              {isAuthenticated ? "Delivering to" : "Deliver to"}
            </div>
            <div className="text-xs font-semibold text-white">
              {isAuthenticated ? user?.fullName ?? "Account" : "Update location"}
            </div>
          </div>
        </div>

        <NavbarSearch />

        <div className="ml-auto flex items-center gap-4 text-xs">
          <button className="hidden items-center gap-1 text-xs font-semibold text-white md:flex">
            <Globe className="h-4 w-4" />
            EN
            <ChevronDown className="h-3 w-3" />
          </button>

          <NavbarUser />

          <Link href="/orders" className="hidden leading-tight md:block">
            <div className="text-[10px] text-zinc-300">Returns</div>
            <div className="text-xs font-semibold text-white">& Orders</div>
          </Link>

          <NavbarCart />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
