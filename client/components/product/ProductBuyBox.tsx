"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product.types";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

type ProductBuyBoxProps = {
  product: Product;
};

const ProductBuyBox = ({ product }: ProductBuyBoxProps) => {
  const priceValue = Number(product.price) || 0;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();
  const router = useRouter();
  const originalPrice =
    product.discountPercent > 0
      ? Number((priceValue / (1 - product.discountPercent / 100)).toFixed(2))
      : undefined;

  const handleBuyNow = async () => {
    await addToCart(product.id, quantity);
    router.push("/cart");
  };

  return (
    <aside className="h-fit rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="space-y-3 text-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-semibold text-zinc-900">₹{priceValue.toFixed(0)}</div>
            {originalPrice ? (
              <div className="text-xs text-zinc-500">
                M.R.P.: <span className="line-through">₹{originalPrice.toFixed(0)}</span>
              </div>
            ) : null}
          </div>
          <button className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
            Price history
          </button>
        </div>

        <div className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-600">
          Fulfilled
        </div>

        <div className="text-xs text-zinc-600">
          FREE delivery <span className="font-semibold">Sunday, 24 May</span>.
          <span className="text-blue-700"> Details</span>
        </div>

        <div className="text-xs text-zinc-600">
          Delivering to <span className="font-semibold">Phagwara 144411</span> -
          <span className="text-blue-700"> Update location</span>
        </div>

        <div className="text-sm font-semibold text-emerald-600">In stock</div>

        <label className="flex items-center gap-2 text-xs text-zinc-500">
          Quantity
          <select
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className="rounded-md border border-zinc-200 px-2 py-1 text-xs"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <Button
          onClick={() => addToCart(product.id, quantity)}
          disabled={isLoading}
          className="w-full bg-(--amazon-orange) text-xs text-zinc-900 hover:bg-[#f6a52b]"
        >
          Add to cart
        </Button>
        <Button
          onClick={handleBuyNow}
          className="w-full bg-[#ff9900] text-xs text-zinc-900 hover:bg-[#f6a52b]"
        >
          Buy Now
        </Button>

        <div className="space-y-1 text-xs text-zinc-600">
          <div>
            Ships from <span className="text-blue-700">Amazon</span>
          </div>
          <div>
            Sold by <span className="text-blue-700">Clicktech Retail Pvt Ltd</span>
          </div>
          <div>
            Payment <span className="text-blue-700">Secure transaction</span>
          </div>
          <div>
            Gift options <span className="text-blue-700">Available at checkout</span>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-3">
          <div className="text-xs font-semibold text-zinc-900">Add a Protection Plan:</div>
          <label className="mt-2 flex items-start gap-2 text-xs text-zinc-600">
            <input type="checkbox" className="mt-0.5 h-3 w-3" />
            1 Year Extended warranty by OneAssist for ₹135.00
          </label>
          <label className="mt-2 flex items-start gap-2 text-xs text-zinc-600">
            <input type="checkbox" className="mt-0.5 h-3 w-3" />
            Extended Warranty for ₹299.00
          </label>
        </div>

        <button className="w-full rounded-md border border-zinc-300 py-1.5 text-xs text-zinc-700">
          Add to Wish List
        </button>
      </div>
    </aside>
  );
};

export default ProductBuyBox;
