"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import type { Category } from "@/types/product.types";

const CategoryBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getCategories();
        setCategories(response);
      } catch {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-(--amazon-navy-light) text-white">
      <div className="flex w-full items-center gap-4 overflow-x-auto px-4 py-2 text-xs font-medium uppercase tracking-wide">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/?categoryId=${category.id}`}
            className="whitespace-nowrap hover:text-(--amazon-orange)"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
