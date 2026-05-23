"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import FilterSidebar from "@/components/filters/FilterSidebar";
import SortBar from "@/components/filters/SortBar";
import { useProducts } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorBanner from "@/components/shared/ErrorBanner";
import { productService } from "@/services/productService";
import type { Category, ProductFiltersMeta } from "@/types/product.types";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const posterScrollRef = useRef<HTMLDivElement | null>(null);
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

  const handleSortChange = (value: string) => {
    const query = new URLSearchParams(params.toString());
    query.set("sort", value);
    router.push(`/?${query.toString()}`);
  };

  const isSearchView = Boolean(
    search ||
      categoryId ||
      brands ||
      minPrice ||
      maxPrice ||
      ratingMin ||
      freeDelivery ||
      condition ||
      params.get("discount")
  );

  const heroSlides = useMemo(() => {
    return products
      .filter((product) => product.images.length > 0)
      .slice(0, 8)
      .map((product) => ({
        id: product.id,
        title: product.name,
        price: product.price,
        brand: product.brand,
        image: product.images[0].url
      }));
  }, [products]);

  const categoryCards = useMemo(() => {
    return categories.slice(0, 8).map((category) => {
      const sample = products.find((product) => product.categoryId === category.id) ?? products[0];
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: sample?.images[0]?.url ?? "https://picsum.photos/seed/fallback/600/600"
      };
    });
  }, [categories, products]);

  const promoCards = useMemo(() => {
    return products.slice(6, 12).map((product) => ({
      id: product.id,
      title: product.name,
      image: product.images[0]?.url ?? "https://picsum.photos/seed/promo/600/600",
      price: product.price
    }));
  }, [products]);

  const scrollPosters = (direction: "prev" | "next") => {
    if (!posterScrollRef.current) {
      return;
    }
    const scrollAmount = 280;
    posterScrollRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  if (isSearchView) {
    return (
      <div className="flex w-full gap-4 px-3 py-4">
        <FilterSidebar meta={meta} />
        <div className="flex-1 space-y-4">
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
  }

  return (
    <div className="w-full bg-[#eaeded]">
      <section className="w-full bg-white">
        <div className="relative w-full px-3 py-3">
          <div className="relative">
            <div
              ref={posterScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
              {heroSlides.map((poster) => (
                <Link
                  key={poster.id}
                  href={`/products/${poster.id}`}
                  className="relative h-97.5 w-65 shrink-0 overflow-hidden rounded-[18px] bg-black shadow"
                >
                  <Image
                    src={poster.image}
                    alt={poster.title}
                    fill
                    priority
                    sizes="260px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 right-4 text-white">
                    <p className="text-[11px] uppercase tracking-wide text-white/80">
                      {poster.brand}
                    </p>
                    <h2 className="mt-2 text-[20px] font-semibold leading-tight">
                      {poster.title}
                    </h2>
                    <p className="mt-2 text-xs text-white/90">
                      Starting at Rs {Math.round(poster.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <button
              className="absolute left-1 top-1/2 flex h-12 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-zinc-200 bg-white/95 text-sm font-semibold shadow"
              onClick={() => scrollPosters("prev")}
              aria-label="Previous posters"
            >
              {"<"}
            </button>
            <button
              className="absolute right-1 top-1/2 flex h-12 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-zinc-200 bg-white/95 text-sm font-semibold shadow"
              onClick={() => scrollPosters("next")}
              aria-label="Next posters"
            >
              {">"}
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-3 pb-8 pt-3">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categoryCards.map((card) => (
            <Link
              key={card.id}
              href={`/?categoryId=${card.id}`}
              className="rounded-md bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-zinc-900">{card.name}</h3>
              <div className="relative mt-3 h-40 w-full overflow-hidden rounded-md bg-zinc-100">
                <Image src={card.image} alt={card.name} fill className="object-cover" />
              </div>
              <p className="mt-3 text-xs text-blue-700">See more</p>
            </Link>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {promoCards.map((promo) => (
            <Link key={promo.id} href={`/products/${promo.id}`} className="rounded-md bg-white p-4">
              <h3 className="text-sm font-semibold text-zinc-900">Deal for you</h3>
              <div className="relative mt-3 h-40 w-full overflow-hidden rounded-md bg-zinc-100">
                <Image src={promo.image} alt={promo.title} fill className="object-cover" />
              </div>
              <p className="mt-3 text-xs text-red-600">Starting at Rs {Math.round(promo.price)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
