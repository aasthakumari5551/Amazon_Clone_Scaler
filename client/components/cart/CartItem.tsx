"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart.types";

type CartItemProps = {
  item: CartItemType;
  onUpdate: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

const CartItem = ({ item, onUpdate, onRemove }: CartItemProps) => {
  const image = item.product.images[0];

  return (
    <div className="flex gap-4 border-b border-zinc-200 py-4">
      <input type="checkbox" defaultChecked className="mt-8 h-4 w-4" />
      <div className="relative h-28 w-28 overflow-hidden rounded-md bg-zinc-100">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 gap-4">
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold text-zinc-900">
            {item.product.name}
          </h3>
          <p className="text-xs text-emerald-600">In stock</p>
          <p className="text-xs text-zinc-600">
            FREE delivery <span className="font-semibold">Mon, 25 May</span> available at checkout
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded border border-zinc-200 px-2 py-0.5 text-[11px] text-zinc-600">
              Fulfilled
            </span>
          </div>
          <label className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
            <input type="checkbox" className="h-3 w-3" />
            This will be a gift <span className="text-blue-700">Learn more</span>
          </label>
          <div className="mt-3 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 rounded-full border border-[#ffd814] px-2 py-1">
              <button onClick={() => onRemove(item.productId)}>
                <Trash2 className="h-3 w-3" />
              </button>
              <button onClick={() => onUpdate(item.productId, Math.max(1, item.quantity - 1))}>
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-2 text-xs font-semibold">{item.quantity}</span>
              <button onClick={() => onUpdate(item.productId, item.quantity + 1)}>
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button className="text-blue-700">Delete</button>
            <button className="text-blue-700">Save for later</button>
            <button className="text-blue-700">See more like this</button>
            <button className="text-blue-700">Share</button>
          </div>
        </div>
        <div className="text-right text-base font-semibold text-zinc-900">
          ₹{Number(item.product.price).toFixed(0)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
