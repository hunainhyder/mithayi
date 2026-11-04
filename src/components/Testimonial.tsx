import { getSettings } from "@/lib/data";
import { ArrowLeftIcon, ArrowRightIcon, AsteriskIcon, StarIcon } from "./Icons";
import styles from "./Testimonial.module.css";

export default async function Testimonial() {
  const s = await getSettings();
  const [current] = s.testimonials_list;
  if (!current) return null;

  const parsed = Math.round(Number(current.rating));
  const rating = Number.isFinite(parsed) ? Math.min(5, Math.max(0, parsed)) : 5;

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <AsteriskIcon size={30} strokeWidth={3} className={styles.mark} />
        <p className={styles.eyebrow}>{s.testimonials_eyebrow}</p>
        <div className={styles.stars} role="img" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: rating }, (_, i) => (
            <StarIcon key={i} size={9} />
          ))}
        </div>

        <blockquote className={styles.quote}>&ldquo;{current.quote}&rdquo;</blockquote>
        <p className={styles.author}>
          <strong>{current.author}</strong>
          {current.city && <> &mdash; {current.city}</>}
        </p>

        <div className={styles.controls}>
          <button type="button" className={styles.arrow} aria-label="Previous review">
            <ArrowLeftIcon size={14} />
          </button>
          <span className={styles.count}>
            01 / {String(s.testimonials_list.length).padStart(2, "0")}
          </span>
          <button type="button" className={styles.arrow} aria-label="Next review">
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
