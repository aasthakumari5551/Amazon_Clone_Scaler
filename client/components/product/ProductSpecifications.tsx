type ProductSpecificationsProps = {
  description: string;
};

const ProductSpecifications = ({ description }: ProductSpecificationsProps) => (
  <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700">
    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
      Specifications
    </h4>
        <h3 className="text-sm font-semibold text-zinc-900">About this item</h3>
        <div className="mt-3 h-px w-full bg-zinc-100" />
        <p className="mt-3 text-sm text-zinc-600">{description}</p>
  </div>
);

export default ProductSpecifications;
