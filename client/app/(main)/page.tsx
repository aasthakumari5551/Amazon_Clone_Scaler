"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSidebar from "@/components/filters/FilterSidebar";
import SortBar from "@/components/filters/SortBar";
import { useProducts } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorBanner from "@/components/shared/ErrorBanner";
import { productService } from "@/services/productService";
import type { ProductFiltersMeta } from "@/types/product.types";

const HomePage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search") ?? "";
  const categoryId = params.get("categoryId") ?? "";
  const brands = params.get("brands") ?? "";
  const minPrice = params.get("minPrice") ?? "";
  const maxPrice = params.get("maxPrice") ?? "";
  const ratingMin = params.get("ratingMin") ?? "";
  const freeDelivery = params.get("freeDelivery") ?? "";
  const condition = params.get("condition") ?? "";
  const sort = params.get("sort") ?? "featured";
  const [meta, setMeta] = useState<ProductFiltersMeta | null>(null);
  const { products, total, page, limit, setPage, isLoading, error } = useProducts({
    search,
    categoryId,
    brands,
    minPrice,
    maxPrice,
    ratingMin,
    freeDelivery,
    discount: params.get("discount") ?? "",
    condition,
    sort
  });

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const response = await productService.getFiltersMeta();
        setMeta(response);
      } catch {
        setMeta(null);
      }
    };

    fetchMeta();
  }, []);

  const handleSortChange = (value: string) => {
    const query = new URLSearchParams(params.toString());
    query.set("sort", value);
    router.push(`/?${query.toString()}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  return (
    <div className="flex gap-6">
      <FilterSidebar meta={meta} />
      <div className="flex-1 space-y-6">
        <SortBar total={total} query={search} sort={sort} onSortChange={handleSortChange} />
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
            No products found.
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
        <div className="flex items-center justify-center gap-2">
          <button
            className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs"
            disabled={page <= 1}
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            Prev
          </button>
          <button
            className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs"
            disabled={page * limit >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
