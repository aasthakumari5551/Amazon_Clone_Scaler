"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product.types";
import StarRating from "@/components/shared/StarRating";
import ProductSpecifications from "./ProductSpecifications";

type ProductDetailInfoProps = {
  product: Product;
};

const formatDeliveryDate = (daysAhead: number) => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + daysAhead);

  const weekday = deliveryDate.toLocaleDateString("en-US", { weekday: "short" });
  const day = deliveryDate.toLocaleDateString("en-US", { day: "numeric" });
  const month = deliveryDate.toLocaleDateString("en-US", { month: "short" });

  return `${weekday}, ${day} ${month}`;
};

const ProductDetailInfo = ({ product }: ProductDetailInfoProps) => {
  const { addToCart } = useCart();
  const priceValue = Number(product.price) || 0;
  const originalPrice =
    product.discountPercent > 0
      ? Number((priceValue / (1 - product.discountPercent / 100)).toFixed(2))
      : undefined;
  const standardDelivery = formatDeliveryDate(3);
  const primeDelivery = formatDeliveryDate(2);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-[26px] font-medium leading-tight text-zinc-900 lg:text-[30px]">
          {product.name}
        </h1>
        <div className="text-base font-semibold text-zinc-900 lg:text-[18px]">
          Visit the {product.brand} Store
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <StarRating rating={product.rating} count={product.reviewCount} />
          <span className="text-xs text-zinc-500">50+ bought in past month</span>
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-3">
        {product.discountPercent > 0 ? (
          <div className="inline-flex items-center rounded bg-red-600 px-2 py-1 text-[11px] font-semibold text-white">
            Limited time deal
          </div>
        ) : null}
        <div className="mt-3 flex items-end gap-2">
          {product.discountPercent > 0 ? (
            <span className="text-2xl font-semibold text-red-600">-{product.discountPercent}%</span>
          ) : null}
          <span className="text-[30px] font-medium text-zinc-900">₹{priceValue.toFixed(0)}</span>
        </div>
        {originalPrice ? (
          <div className="text-xs text-zinc-500">
            M.R.P.: <span className="line-through">₹{originalPrice.toFixed(0)}</span>
          </div>
        ) : null}
        <div className="mt-1 text-xs text-zinc-600">Inclusive of all taxes</div>
        <div className="mt-2 text-sm font-semibold text-emerald-600">In stock</div>
        <div className="mt-3 space-y-1 text-sm text-zinc-900">
          <div>
            FREE delivery <span className="font-semibold">{standardDelivery}</span>
          </div>
          <div>
            Or <span className="text-blue-700">Prime members</span> get FREE delivery{" "}
            <span className="font-semibold">{primeDelivery}</span>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Button
          onClick={() => addToCart(product.id, 1)}
          className="w-full rounded-full bg-[#ffce12] text-sm font-semibold text-zinc-900 hover:bg-[#f2c400]"
        >
          Add to cart
        </Button>
        <div className="mt-2 text-xs text-zinc-600">
          Ships from <span className="text-blue-700">Amazon</span> • Sold by{" "}
          <span className="text-blue-700">Clicktech Retail Pvt Ltd</span>
        </div>
      </div>

      <ProductSpecifications product={product} />
    </div>
  );
};

export default ProductDetailInfo;
