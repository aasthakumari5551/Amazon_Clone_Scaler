"use client";

import { Star, ShieldCheck, BadgeCheck, Truck, Wallet, BadgePercent } from "lucide-react";
import type { Product } from "@/types/product.types";
import StarRating from "@/components/shared/StarRating";
import StockBadge from "@/components/shared/StockBadge";
import ProductSpecifications from "./ProductSpecifications";

type ProductDetailInfoProps = {
  product: Product;
};

const ProductDetailInfo = ({ product }: ProductDetailInfoProps) => {
  const priceValue = Number(product.price) || 0;
  const originalPrice =
    product.discountPercent > 0
      ? Number((priceValue / (1 - product.discountPercent / 100)).toFixed(2))
      : undefined;

  const offerCards = [
    {
      title: "Cashback",
      body: "Upto Rs 83.00 cashback as Amazon Pay Balance"
    },
    {
      title: "No Cost EMI",
      body: "Upto Rs 90.77 EMI interest savings"
    },
    {
      title: "Partner Offers",
      body: "Get GST invoice and save up to 18%"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-[22px] font-semibold leading-tight text-zinc-900">
          {product.name}
        </h1>
        <div className="text-sm text-blue-700">Visit the {product.brand} Store</div>
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
          <span className="text-3xl font-semibold text-zinc-900">₹{priceValue.toFixed(0)}</span>
        </div>
        {originalPrice ? (
          <div className="text-xs text-zinc-500">
            M.R.P.: <span className="line-through">₹{originalPrice.toFixed(0)}</span>
          </div>
        ) : null}
        <div className="mt-1 text-xs text-zinc-600">Inclusive of all taxes</div>
        <div className="mt-2 text-xs text-zinc-600">
          EMI starts at ₹98. No Cost EMI available <span className="text-blue-700">EMI options</span>
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
          <BadgePercent className="h-4 w-4 text-orange-500" /> Offers
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {offerCards.map((offer) => (
            <div key={offer.title} className="rounded-md border border-zinc-200 bg-white p-3 text-xs">
              <div className="font-semibold text-zinc-900">{offer.title}</div>
              <div className="mt-2 text-zinc-600">{offer.body}</div>
              <div className="mt-2 text-blue-700">See details</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-zinc-200 pt-4 text-[11px] text-zinc-600">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-zinc-500" />
          10 days Service
        </div>
        <div className="flex flex-col items-center gap-2">
          <Truck className="h-6 w-6 text-zinc-500" />
          Free Delivery
        </div>
        <div className="flex flex-col items-center gap-2">
          <BadgeCheck className="h-6 w-6 text-zinc-500" />
          1 Year Warranty
        </div>
        <div className="flex flex-col items-center gap-2">
          <Wallet className="h-6 w-6 text-zinc-500" />
          Pay on Delivery
        </div>
        <div className="flex flex-col items-center gap-2">
          <Star className="h-6 w-6 text-zinc-500" />
          Top Brand
        </div>
      </div>

      <ProductSpecifications product={product} />
    </div>
  );
};

export default ProductDetailInfo;
