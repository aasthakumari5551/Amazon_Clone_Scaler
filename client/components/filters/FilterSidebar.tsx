"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProductFiltersMeta } from "@/types/product.types";

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b border-zinc-200 pb-4">
    <h3 className="mb-2 text-[13px] font-semibold text-zinc-900 uppercase tracking-wide">
      {title}
    </h3>
    <div className="space-y-1.5 text-[13px] text-zinc-700">{children}</div>
  </div>
);

type FilterSidebarProps = {
  meta: ProductFiltersMeta | null;
};

const FilterSidebar = ({ meta }: FilterSidebarProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const selectedBrands = useMemo(() => {
    const brands = params.get("brands");
    return brands ? brands.split(",").filter(Boolean) : [];
  }, [params]);

  const updateParam = (key: string, value?: string) => {
    const query = new URLSearchParams(params.toString());

    if (!value) {
      query.delete(key);
    } else {
      query.set(key, value);
    }

    router.push(`/?${query.toString()}`);
  };

  const toggleBrand = (brand: string) => {
    const set = new Set(selectedBrands);
    if (set.has(brand)) {
      set.delete(brand);
    } else {
      set.add(brand);
    }
    updateParam("brands", Array.from(set).join(","));
  };

  const minPrice = meta?.minPrice ?? 0;
  const maxPrice = meta?.maxPrice ?? 0;
  const currentMax = Number(params.get("maxPrice") ?? maxPrice);

  return (
    <aside className="hidden w-64 shrink-0 space-y-4 md:block">
      <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
        <FilterSection title="Delivery">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-zinc-300"
              checked={params.get("freeDelivery") === "true"}
              onChange={(event) => updateParam("freeDelivery", event.target.checked ? "true" : "")}
            />
            <span>Free delivery eligible</span>
          </label>
          <p className="text-[11px] text-zinc-500">Get free delivery on select items.</p>
        </FilterSection>

        <FilterSection title="Brands">
          {(meta?.brands ?? []).map((brand) => (
            <label key={brand.name} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-zinc-300"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => toggleBrand(brand.name)}
                />
                <span>{brand.name}</span>
              </span>
              <span className="text-[11px] text-zinc-400">{brand.count}</span>
            </label>
          ))}
        </FilterSection>

        <FilterSection title="Price">
          <div className="space-y-2">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={currentMax}
              onChange={(event) => updateParam("maxPrice", event.target.value)}
              className="w-full"
            />
            <div className="flex items-center justify-between text-[11px] text-zinc-500">
              <span>₹{minPrice.toLocaleString()}</span>
              <span>₹{currentMax.toLocaleString()}</span>
            </div>
            <label className="flex items-center gap-2 text-[12px] text-zinc-600">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-zinc-300"
                checked={params.get("maxPrice") === String(maxPrice)}
                onChange={(event) =>
                  updateParam("maxPrice", event.target.checked ? String(maxPrice) : "")
                }
              />
              Up to ₹{maxPrice.toLocaleString()}
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Deals & Discounts">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-zinc-300"
              checked={params.get("discount") === "true"}
              onChange={(event) => updateParam("discount", event.target.checked ? "true" : "")}
            />
            <span>Discounted only</span>
          </label>
        </FilterSection>

        <FilterSection title="Customer Rating">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2">
              <input
                type="radio"
                name="rating"
                className="h-3.5 w-3.5 border-zinc-300"
                checked={Number(params.get("ratingMin")) === rating}
                onChange={() => updateParam("ratingMin", String(rating))}
              />
              <span>{rating} stars & up</span>
            </label>
          ))}
        </FilterSection>

        <FilterSection title="Condition">
          {(meta?.conditions ?? []).map((condition) => (
            <label key={condition.name} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-zinc-300"
                  checked={params.get("condition") === condition.name}
                  onChange={(event) =>
                    updateParam("condition", event.target.checked ? condition.name : "")
                  }
                />
                <span className="capitalize">{condition.name.toLowerCase()}</span>
              </span>
              <span className="text-[11px] text-zinc-400">{condition.count}</span>
            </label>
          ))}
        </FilterSection>
      </div>
    </aside>
  );
};

export default FilterSidebar;
