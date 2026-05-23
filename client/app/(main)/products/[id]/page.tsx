"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import ProductImageCarousel from "../../../../components/product/ProductImageCarousel";
import ProductDetailInfo from "../../../../components/product/ProductDetailInfo";
import ProductBuyBox from "../../../../components/product/ProductBuyBox";
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
    <div className="w-full px-3 py-4">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <Link href="/" className="text-xs text-zinc-500 hover:underline">Home</Link>
        <span>›</span>
        {product?.category ? (
          <>
            <Link href={`/?categoryId=${product.category.id}`} className="text-xs text-zinc-500 hover:underline">
              {product.category.name}
            </Link>
            <span>›</span>
          </>
        ) : null}
        <span className="text-xs text-zinc-500">{product.name}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)_280px] lg:items-start">
        <ProductImageCarousel images={product.images} name={product.name} />
        <ProductDetailInfo product={product} />
        <ProductBuyBox product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
