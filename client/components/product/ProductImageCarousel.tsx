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
    <div className="space-y-4">
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-zinc-100">
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={activeImage.altText}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No image
          </div>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`relative h-16 w-16 overflow-hidden rounded-xl border ${
              index === activeIndex ? "border-(--amazon-orange)" : "border-zinc-200"
            }`}
          >
            <Image src={image.url} alt={image.altText} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
