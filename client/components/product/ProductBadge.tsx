type ProductBadgeProps = {
  label: string;
};

const ProductBadge = ({ label }: ProductBadgeProps) => (
  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
    {label}
  </span>
);

export default ProductBadge;
