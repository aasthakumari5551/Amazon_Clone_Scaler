type StockBadgeProps = {
  stock: number;
};

const StockBadge = ({ stock }: StockBadgeProps) => {
  if (stock <= 0) {
    return <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">Out of stock</span>;
  }

  if (stock < 5) {
    return <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">Low stock</span>;
  }

  return <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">In stock</span>;
};

export default StockBadge;
