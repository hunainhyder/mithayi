import { StarIcon } from "./Icons";
import styles from "./StarRating.module.css";

/** Five stars filled to the given rating (supports halves). */
export default function StarRating({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  const percent = Math.max(0, Math.min(5, rating)) * 20;
  const row = Array.from({ length: 5 }, (_, i) => <StarIcon key={i} size={size} />);

  return (
    <span className={styles.rating} role="img" aria-label={`${rating} out of 5 stars`}>
      <span className={styles.empty}>{row}</span>
      <span className={styles.filled} style={{ width: `${percent}%` }}>
        {row}
      </span>
    </span>
  );
}
