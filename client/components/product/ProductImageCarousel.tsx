"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types/product.types";

type ProductImageCarouselProps = {
  images: ProductImage[];
  name: string;
};

const ProductImageCarousel = ({ images, name }: ProductImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 text-[10px] font-semibold text-zinc-500">
          VIDEO
        </div>
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`relative h-16 w-16 overflow-hidden rounded-md ${
              index === activeIndex ? "ring-2 ring-[#ffce12]" : "border border-zinc-200"
            }`}
          >
            <Image src={image.url} alt={image.altText} fill className="object-contain" />
          </button>
        ))}
      </div>
      <div className="flex-1">
        <div className="relative h-130 w-full overflow-hidden rounded-lg bg-white">
          {activeImage ? (
            <Image
              src={activeImage.url}
              alt={activeImage.altText}
              fill
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">No image</div>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-blue-700">Click to see full view</p>
      </div>
    </div>
  );
};

export default ProductImageCarousel;
