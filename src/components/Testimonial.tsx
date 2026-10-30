import { testimonials, testimonialTotal } from "@/data/testimonials";
import { ArrowLeftIcon, ArrowRightIcon, AsteriskIcon, StarIcon } from "./Icons";
import styles from "./Testimonial.module.css";

export default function Testimonial() {
  const [current] = testimonials;

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <AsteriskIcon size={30} strokeWidth={3} className={styles.mark} />
        <p className={styles.eyebrow}>Kind words, sweet memories</p>
        <div className={styles.stars} role="img" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} size={9} />
          ))}
        </div>

        <blockquote className={styles.quote}>
          &ldquo;{current.quote}&rdquo;
        </blockquote>
        <p className={styles.author}>
          <strong>{current.author}</strong> &mdash; {current.city}
        </p>

        <div className={styles.controls}>
          <button type="button" className={styles.arrow} aria-label="Previous review">
            <ArrowLeftIcon size={14} />
          </button>
          <span className={styles.count}>
            01 / {String(testimonialTotal).padStart(2, "0")}
          </span>
          <button type="button" className={styles.arrow} aria-label="Next review">
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
