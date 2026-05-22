"use client";

import { create } from "zustand";
import type { Product } from "@/types/product.types";

type ProductFilters = {
  search?: string;
  categoryId?: string;
};

type ProductState = {
  products: Product[];
  total: number;
  currentPage: number;
  filters: ProductFilters;
  setProducts: (products: Product[], total: number, page: number) => void;
  setFilters: (filters: ProductFilters) => void;
  resetFilters: () => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  total: 0,
  currentPage: 1,
  filters: {},
  setProducts: (products, total, page) => set({ products, total, currentPage: page }),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: {} })
}));
