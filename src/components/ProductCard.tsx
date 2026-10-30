import Image from "next/image";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import { HeartIcon, StarIcon } from "./Icons";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 330px"
          className={styles.image}
        />
        <span className={styles.badge}>{product.badge}</span>
        <button type="button" className={styles.wish} aria-label="Save to wishlist">
          <HeartIcon size={15} />
        </button>
      </div>

      <p className={styles.meta}>
        <StarIcon size={11} className={styles.star} />
        <span className={styles.rating}>{product.rating.toFixed(1)}</span>
        <span>&middot; {product.category}</span>
      </p>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.blurb}>{product.blurb}</p>
      <p className={styles.price}>{formatPrice(product.price)}</p>
    </article>
  );
}
