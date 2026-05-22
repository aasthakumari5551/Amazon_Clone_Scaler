"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart.types";
import PriceTag from "@/components/shared/PriceTag";

type CartItemProps = {
  item: CartItemType;
  onUpdate: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

const CartItem = ({ item, onUpdate, onRemove }: CartItemProps) => {
  const image = item.product.images[0];

  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-zinc-100">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">{item.product.name}</h3>
            <p className="text-xs text-zinc-500">{item.product.category.name}</p>
          </div>
          <PriceTag amount={Number(item.product.price)} />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdate(item.productId, Math.max(1, item.quantity - 1))}
            className="rounded-full border border-zinc-200 p-1"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-sm font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdate(item.productId, item.quantity + 1)}
            className="rounded-full border border-zinc-200 p-1"
          >
            <Plus className="h-3 w-3" />
          </button>
          <button
            onClick={() => onRemove(item.productId)}
            className="ml-auto text-xs text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
