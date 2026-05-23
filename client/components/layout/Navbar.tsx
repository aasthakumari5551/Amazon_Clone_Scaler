"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MapPin, Globe, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { orderService } from "@/services/orderService";
import type { Order } from "@/types/order.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import NavbarSearch from "./NavbarSearch";
import NavbarCart from "./NavbarCart";
import NavbarUser from "./NavbarUser";

const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      if (!isAuthenticated) {
        setLatestOrder(null);
        return;
      }

      try {
        const orders = await orderService.getOrders();
        if (!orders.length) {
          setLatestOrder(null);
          return;
        }

        const sorted = [...orders].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLatestOrder(sorted[0]);
      } catch {
        setLatestOrder(null);
      }
    };

    fetchLatestOrder();
  }, [isAuthenticated]);

  const deliveryLabel = useMemo(() => {
    if (!latestOrder?.shippingCity || !latestOrder.shippingPin) {
      return null;
    }
    return `${latestOrder.shippingCity} ${latestOrder.shippingPin}`;
  }, [latestOrder]);

  return (
    <header className="bg-(--amazon-navy) text-white">
      <div className="flex h-16 w-full items-center gap-4 px-6">
        <Link href="/" className="flex items-end gap-1">
          <Image
            src="/brand/logo.png"
            alt="amzon"
            width={120}
            height={36}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {deliveryLabel ? (
          <Dialog>
            <DialogTrigger asChild>
              <button className="hidden items-center gap-2 text-left text-xs text-zinc-200 md:flex">
                <MapPin className="h-4 w-4" />
                <div className="leading-tight">
                  <div className="text-[10px] text-zinc-300">Delivering to</div>
                  <div className="text-xs font-semibold text-white">{deliveryLabel}</div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0">
              <DialogHeader className="border-b border-zinc-200 px-4 py-3">
                <DialogTitle className="text-sm font-semibold text-zinc-900">
                  Choose your location
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 px-4 py-4 text-xs text-zinc-700">
                <div className="rounded-md border border-orange-200 bg-orange-50 p-3 text-zinc-700">
                  We chose a general location to help you shop. For more accurate selection and
                  delivery times, update your location.
                </div>
                <p className="text-xs text-zinc-600">
                  Select a delivery location to see product availability and delivery options
                </p>
                <button className="text-xs font-semibold text-blue-700">
                  Add an address or pick-up point
                </button>
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <span className="h-px flex-1 bg-zinc-200" />
                  or enter an Indian pincode
                  <span className="h-px flex-1 bg-zinc-200" />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter PIN"
                    className="h-9 flex-1 rounded-md border border-zinc-300 px-3 text-xs"
                  />
                  <button className="h-9 rounded-full border border-zinc-400 px-4 text-xs font-semibold">
                    Apply
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : null}

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
