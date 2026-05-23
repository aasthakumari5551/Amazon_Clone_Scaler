"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product.types";
import StarRating from "@/components/shared/StarRating";
import { useCart } from "@/hooks/useCart";
import { formatCurrency, truncateText } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isLoading } = useCart();
  const image = product.images[0];
  const priceValue = Number(product.price) || 0;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const deliveryLabel = deliveryDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
  const primeDeliveryDate = new Date();
  primeDeliveryDate.setDate(primeDeliveryDate.getDate() + 2);
  const primeDeliveryLabel = primeDeliveryDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });

  return (
    <div className="border-b border-zinc-200 px-0 py-4">
      <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-62.5 w-full overflow-hidden bg-white md:h-67.5">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText}
              fill
              sizes="(max-width: 768px) 90vw, 220px"
              className="object-contain"
            />
          ) : null}
          </div>
        </Link>

        <div className="flex min-w-0 flex-col gap-2">
          <Link href={`/products/${product.id}`} className="space-y-1">
            <p className="text-sm font-semibold text-zinc-900">{product.brand}</p>
            <h3 className="text-[18px] font-semibold leading-snug text-zinc-900">
              {truncateText(product.name, 140)}
            </h3>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} count={product.reviewCount} />
              {product.condition !== "NEW" ? (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600">
                  {product.condition.toLowerCase()}
                </span>
              ) : null}
            </div>
          </Link>

          <div className="space-y-1 text-sm text-zinc-700">
            {product.discountPercent > 0 ? (
              <div className="text-xs font-semibold text-red-600">
                {product.discountPercent}% off
              </div>
            ) : null}
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-medium text-zinc-900">
                {formatCurrency(priceValue)}
              </span>
              {product.discountPercent > 0 ? (
                <span className="text-xs text-zinc-500 line-through">
                  {formatCurrency(
                    priceValue / (1 - Math.min(product.discountPercent, 95) / 100)
                  )}
                </span>
              ) : null}
            </div>
            <p className="text-xs text-zinc-500">Delivery charges apply</p>
            <div className="space-y-0.5 text-sm text-zinc-900">
              <p>
                FREE delivery <span className="font-semibold">{deliveryLabel}</span>
              </p>
              <p>
                Or <span className="text-blue-700">Prime members</span> get FREE delivery{" "}
                <span className="font-semibold">{primeDeliveryLabel}</span>
              </p>
            </div>
          </div>

          <div className="mt-1 flex flex-col items-start gap-2">
            <Button
              onClick={() => addToCart(product.id, 1)}
              disabled={isLoading}
              className="w-full max-w-60 rounded-full bg-[#ffce12] text-xs font-semibold text-zinc-900 hover:bg-[#f2c400]"
            >
              Add to cart
            </Button>
            <p className="text-[11px] text-zinc-500">Ships from Amazon Clone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
