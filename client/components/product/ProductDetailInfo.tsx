"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product.types";
import StarRating from "@/components/shared/StarRating";
import PriceTag from "@/components/shared/PriceTag";
import StockBadge from "@/components/shared/StockBadge";
import ProductSpecifications from "./ProductSpecifications";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

type ProductDetailInfoProps = {
  product: Product;
};

const ProductDetailInfo = ({ product }: ProductDetailInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();
  const router = useRouter();
  const originalPrice =
    product.discountPercent > 0
      ? Number((product.price / (1 - product.discountPercent / 100)).toFixed(2))
      : undefined;

  const handleBuyNow = async () => {
    await addToCart(product.id, quantity);
    router.push("/cart");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs text-zinc-500">Brand: {product.brand}</p>
          <h1 className="text-2xl font-semibold text-zinc-900">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <StarRating rating={product.rating} count={product.reviewCount} />
            <StockBadge stock={product.stock} />
            {product.condition !== "NEW" ? (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600">
                {product.condition.toLowerCase()} condition
              </span>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          {product.discountPercent > 0 ? (
            <div className="text-sm text-red-600">
              {product.discountPercent}% off deal
            </div>
          ) : null}
          <PriceTag amount={product.price} originalPrice={originalPrice} />
          <p className="text-sm text-zinc-600">
            {product.isFreeDelivery ? "FREE Delivery" : "Delivery charges apply"}
          </p>
        </div>

        <ProductSpecifications description={product.description} />
      </div>

      <div className="h-fit rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="space-y-3">
          <PriceTag amount={product.price} originalPrice={originalPrice} />
          <p className="text-xs text-zinc-500">
            {product.isFreeDelivery ? "FREE Delivery" : "Delivery charges apply"}
          </p>
          <StockBadge stock={product.stock} />
          <div className="flex items-center gap-3">
            <label className="text-xs text-zinc-500">Qty</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="h-9 w-20 rounded-md border border-zinc-200 px-2 text-sm"
            />
          </div>
          <Button
            onClick={() => addToCart(product.id, quantity)}
            disabled={isLoading}
            className="w-full bg-(--amazon-orange) text-zinc-900 hover:bg-[#f6a52b]"
          >
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            variant="outline"
            className="w-full border-zinc-300 text-zinc-700"
          >
            Buy Now
          </Button>
          <p className="text-[11px] text-zinc-500">Ships from Amazon Clone</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
