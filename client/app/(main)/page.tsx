"use client";

import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorBanner from "@/components/shared/ErrorBanner";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const params = useSearchParams();
  const search = params.get("search") ?? "";
  const categoryId = params.get("categoryId") ?? "";
  const { products, total, page, setPage, isLoading, error } = useProducts({
    search,
    categoryId
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Featured Products</h1>
          <p className="text-sm text-zinc-500">{total} items available</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            Prev
          </Button>
          <Button variant="outline" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
          No products found.
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default HomePage;
