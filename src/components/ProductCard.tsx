import Image from "next/image";
import Link from "next/link";
import { formatPrice, toPlainText } from "@/lib/format";
import { compareAtPrice, effectiveUnitPrice } from "@/lib/pricing";
import type { Product } from "@/types/api";
import { StarIcon } from "./Icons";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const price = effectiveUnitPrice(product, null);
  const compareAt = compareAtPrice(product, null);
  const category = product.categories[0]?.name;

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.link}>
        <div className={styles.thumb}>
          {product.featured_image && (
            <Image
              src={product.featured_image.url}
              alt={product.name}
              fill
              sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 330px"
              className={styles.image}
            />
          )}
          {product.is_featured && <span className={styles.badge}>Featured</span>}
        </div>

        <p className={styles.meta}>
          {product.average_rating !== null && (
            <>
              <StarIcon size={11} className={styles.star} />
              <span className={styles.rating}>
                {product.average_rating.toFixed(1)}
              </span>
            </>
          )}
          {category && (
            <span>
              {product.average_rating !== null && "· "}
              {category}
            </span>
          )}
        </p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.blurb}>{toPlainText(product.description)}</p>
        <p className={styles.price}>
          {formatPrice(price)}
          {compareAt !== null && (
            <span className={styles.was}>{formatPrice(compareAt)}</span>
          )}
        </p>
      </Link>
    </article>
  );
}
