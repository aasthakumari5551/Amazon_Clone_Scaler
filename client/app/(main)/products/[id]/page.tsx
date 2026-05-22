"use client";

import { useParams } from "next/navigation";
import ProductImageCarousel from "@/components/product/ProductImageCarousel";
import ProductDetailInfo from "@/components/product/ProductDetailInfo";
import ProductBuyBox from "@/components/product/ProductBuyBox";
import { useProductDetail } from "@/hooks/useProductDetail";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorBanner from "@/components/shared/ErrorBanner";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = String(params.id);
  const { product, isLoading, error } = useProductDetail(productId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  if (!product) {
    return <ErrorBanner message="Product not found" />;
  }

  return (
    <div className="w-full px-4 py-4">
      <div className="mb-3 flex flex-wrap gap-2 text-xs text-zinc-500">
        <span>Computers & Accessories</span>
        <span>›</span>
        <span>Accessories & Peripherals</span>
        <span>›</span>
        <span>PC Gaming Peripherals</span>
        <span>›</span>
        <span>Gaming Keyboards</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[520px_1fr_280px]">
        <ProductImageCarousel images={product.images} name={product.name} />
        <ProductDetailInfo product={product} />
        <ProductBuyBox product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
