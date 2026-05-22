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
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border md:h-20 md:w-20 ${
              index === activeIndex
                ? "border-(--amazon-orange) ring-1 ring-(--amazon-orange)"
                : "border-zinc-200"
            }`}
          >
            <Image src={image.url} alt={image.altText} fill className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative h-80 w-full overflow-hidden rounded-xl bg-zinc-100 md:h-[420px]">
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={activeImage.altText}
            fill
            sizes="(max-width: 1024px) 90vw, 420px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No image
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
