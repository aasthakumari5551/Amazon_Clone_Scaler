import { formatCurrency } from "@/lib/utils";

type PriceTagProps = {
  amount: number;
  originalPrice?: number;
};

const PriceTag = ({ amount, originalPrice }: PriceTagProps) => {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-semibold text-zinc-900">
        {formatCurrency(amount)}
      </span>
      {originalPrice ? (
        <span className="text-sm text-zinc-500 line-through">
          {formatCurrency(originalPrice)}
        </span>
      ) : null}
    </div>
  );
};

export default PriceTag;
