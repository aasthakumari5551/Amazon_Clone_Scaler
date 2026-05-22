type ProductSpecificationsProps = {
  description: string;
};

const ProductSpecifications = ({ description }: ProductSpecificationsProps) => (
  <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700">
    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
      Specifications
    </h4>
    <p>{description}</p>
  </div>
);

export default ProductSpecifications;
