import type { Product, ProductListResponse, Category, ProductFiltersMeta } from "@/types/product.types";
import { api } from "./api";

export const productService = {
  getProducts: (query: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    }

    const queryString = params.toString();
    const path = queryString ? `/products?${queryString}` : "/products";
    return api.get<ProductListResponse>(path);
  },
  getProductById: (id: string) => api.get<Product>(`/products/${id}`),
  getCategories: () => api.get<Category[]>("/products/categories"),
  getFiltersMeta: () => api.get<ProductFiltersMeta>("/products/meta")
};
