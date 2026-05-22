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

  return (
    <div className="grid gap-4 p-4 md:grid-cols-[180px_1fr_160px]">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-zinc-100">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText}
              fill
              sizes="(max-width: 768px) 50vw, 180px"
              className="object-cover"
            />
          ) : null}
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <Link href={`/products/${product.id}`} className="space-y-1">
          <p className="text-xs text-zinc-500">{product.brand}</p>
          <h3 className="text-sm font-semibold text-blue-800 hover:underline">
            {truncateText(product.name, 120)}
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
        <div className="text-sm text-zinc-700">
          {product.discountPercent > 0 ? (
            <span className="mr-2 text-xs font-semibold text-red-600">
              {product.discountPercent}% off
            </span>
          ) : null}
          <span className="text-lg font-semibold text-zinc-900">
            {formatCurrency(product.price)}
          </span>
        </div>
        <p className="text-xs text-zinc-500">
          {product.isFreeDelivery ? "FREE Delivery" : "Delivery charges apply"}
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <Button
          onClick={() => addToCart(product.id, 1)}
          disabled={isLoading}
          className="w-full bg-(--amazon-orange) text-xs text-zinc-900 hover:bg-[#f6a52b]"
        >
          Add to cart
        </Button>
        <p className="text-[11px] text-zinc-500">Ships from Amazon Clone</p>
      </div>
    </div>
  );
};

export default ProductCard;
