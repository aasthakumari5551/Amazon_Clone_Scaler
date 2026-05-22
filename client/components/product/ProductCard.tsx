"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product.types";
import StarRating from "@/components/shared/StarRating";
import PriceTag from "@/components/shared/PriceTag";
import ProductBadge from "./ProductBadge";
import { useCart } from "@/hooks/useCart";
import { truncateText } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isLoading } = useCart();
  const image = product.images[0];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-44 w-full overflow-hidden rounded-xl bg-zinc-100">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold text-zinc-900">
            {truncateText(product.name, 52)}
          </h3>
          <StarRating />
          <ProductBadge label={product.category.name} />
          <PriceTag amount={product.price} />
        </div>
      </Link>
      <Button
        onClick={() => addToCart(product.id, 1)}
        disabled={isLoading}
        className="mt-4 w-full bg-(--amazon-orange) text-zinc-900 hover:bg-[#f6a52b]"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
