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

  const handleBuyNow = async () => {
    await addToCart(product.id, quantity);
    router.push("/cart");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">{product.name}</h1>
        <div className="mt-2 flex items-center gap-3">
          <StarRating />
          <StockBadge stock={product.stock} />
        </div>
      </div>
      <PriceTag amount={product.price} />
      <div className="flex items-center gap-3">
        <label className="text-sm text-zinc-500">Qty</label>
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="h-10 w-20 rounded-lg border border-zinc-200 px-2 text-sm"
        />
      </div>
      <div className="space-y-3">
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
      </div>
      <ProductSpecifications description={product.description} />
    </div>
  );
};

export default ProductDetailInfo;
