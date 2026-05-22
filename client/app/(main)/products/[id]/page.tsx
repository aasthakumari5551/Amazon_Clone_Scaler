"use client";

import { useParams } from "next/navigation";
import ProductImageCarousel from "@/components/product/ProductImageCarousel";
import ProductDetailInfo from "@/components/product/ProductDetailInfo";
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
    <div className="mx-auto max-w-6xl px-2">
      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <ProductImageCarousel images={product.images} name={product.name} />
        <ProductDetailInfo product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
