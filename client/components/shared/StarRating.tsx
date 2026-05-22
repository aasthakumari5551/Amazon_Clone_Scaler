type StarRatingProps = {
  rating?: number;
  count?: number;
};

const StarRating = ({ rating = 4.5, count = 128 }: StarRatingProps) => {
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const filled = index + 1 <= Math.round(rating);
    return (
      <span
        key={index}
        className={filled ? "text-amber-500" : "text-zinc-300"}
      >
        ★
      </span>
    );
  });

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-0.5">{stars}</div>
      <span className="text-xs text-zinc-500">({count})</span>
    </div>
  );
};

export default StarRating;
