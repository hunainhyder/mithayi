import { formatDate } from "@/lib/format";
import type { Product } from "@/types/api";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import styles from "./ProductReviews.module.css";

export default function ProductReviews({ product }: { product: Product }) {
  const reviews = product.reviews ?? [];

  return (
    <section id="reviews" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div>
          <p className="eyebrow">Kind words</p>
          <h2 className="section-title">
            Customer <em>reviews.</em>
          </h2>

          {product.average_rating !== null && (
            <p className={styles.summary}>
              <StarRating rating={product.average_rating} size={16} />
              {product.average_rating.toFixed(1)} from {product.reviews_count}{" "}
              {product.reviews_count === 1 ? "review" : "reviews"}
            </p>
          )}

          {reviews.length === 0 ? (
            <p className={styles.empty}>No reviews yet. Be the first to share yours.</p>
          ) : (
            <ul className={styles.list}>
              {reviews.map((review) => (
                <li key={review.id} className={styles.review}>
                  <div className={styles.head}>
                    <strong>{review.name}</strong>
                    <time dateTime={review.created_at}>{formatDate(review.created_at)}</time>
                  </div>
                  {review.rating !== null && <StarRating rating={review.rating} />}
                  {review.message && <p>{review.message}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.write}>
          <h3>Write a review</h3>
          <ReviewForm productId={product.id} />
        </div>
      </div>
    </section>
  );
}
