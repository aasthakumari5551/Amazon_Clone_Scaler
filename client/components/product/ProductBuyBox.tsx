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
    <aside className="hidden h-fit rounded-lg border border-zinc-200 bg-white p-4 shadow-sm lg:block lg:sticky lg:top-4">
      <div className="space-y-3 text-sm">
        <div>
          <div className="text-[28px] font-medium leading-none text-zinc-900">₹{priceValue.toFixed(0)}</div>
          {originalPrice ? (
            <div className="mt-1 text-xs text-zinc-500">
              M.R.P.: <span className="line-through">₹{originalPrice.toFixed(0)}</span>
            </div>
          ) : null}
        </div>

        <div className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-600">
          Fulfilled
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
          className="w-full rounded-full bg-[#ffce12] text-xs font-semibold text-zinc-900 hover:bg-[#f2c400]"
        >
          Add to cart
        </Button>
        <Button
          onClick={handleBuyNow}
          className="w-full rounded-full bg-[#ffce12] text-xs font-semibold text-zinc-900 hover:bg-[#f2c400]"
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
            Gift options <span className="text-blue-700">Available at checkout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductBuyBox;
