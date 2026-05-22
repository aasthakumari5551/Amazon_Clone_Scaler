"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product.types";

export const useProducts = (filters: Record<string, string | number | undefined>) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const filterKey = JSON.stringify(filters);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await productService.getProducts({ ...filters, page });
        setProducts(response.data);
        setTotal(response.total);
        setLimit(response.limit ?? 20);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filterKey, page]);

  return { products, total, page, limit, setPage, isLoading, error };
};
