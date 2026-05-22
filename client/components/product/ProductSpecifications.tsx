import type { Product } from "@/types/product.types";

type ProductSpecificationsProps = {
  product: Product;
};

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const ratingValue = Number(product.rating) || 0;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700">
      <h3 className="text-sm font-semibold text-zinc-900">About this item</h3>
      <div className="mt-3 h-px w-full bg-zinc-100" />
      <p className="mt-3 text-sm text-zinc-600">{product.description}</p>

      <div className="mt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Product details
        </h4>
        <div className="mt-3 grid gap-2 text-sm">
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <span className="text-zinc-500">Brand</span>
            <span className="text-zinc-900">{product.brand}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <span className="text-zinc-500">Condition</span>
            <span className="text-zinc-900">{product.condition}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <span className="text-zinc-500">Category</span>
            <span className="text-zinc-900">{product.category.name}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-2">
            <span className="text-zinc-500">Ratings</span>
            <span className="text-zinc-900">{ratingValue.toFixed(1)} ({product.reviewCount})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Delivery</span>
            <span className="text-zinc-900">
              {product.isFreeDelivery ? "Free delivery" : "Delivery charges apply"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;
