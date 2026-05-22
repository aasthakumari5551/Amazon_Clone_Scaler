"use client";

type SortBarProps = {
  total: number;
  query: string;
  sort: string;
  onSortChange: (value: string) => void;
};

const SortBar = ({ total, query, sort, onSortChange }: SortBarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm">
      <div className="text-zinc-600">
        {query ? (
          <span>
            Showing <span className="font-semibold text-zinc-900">{total}</span> results for{" "}
            <span className="font-semibold text-zinc-900">"{query}"</span>
          </span>
        ) : (
          <span>
            Showing <span className="font-semibold text-zinc-900">{total}</span> products
          </span>
        )}
      </div>
      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
        className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700"
      >
        <option value="featured">Sort by: Featured</option>
        <option value="price_low">Sort by: Price - Low to High</option>
        <option value="price_high">Sort by: Price - High to Low</option>
        <option value="rating">Sort by: Customer Rating</option>
        <option value="newest">Sort by: Newest</option>
      </select>
    </div>
  );
};

export default SortBar;
