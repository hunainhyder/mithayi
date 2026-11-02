"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, useHydrated, usePromo } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import PromoCode from "./PromoCode";
import styles from "./CartView.module.css";

export default function CartView() {
  const hydrated = useHydrated();
  const { items, subtotal, setQuantity, removeItem } = useCart();
  const { promo } = usePromo();
  const discount = promo?.discountAmount ?? 0;

  if (!hydrated) {
    return <div className={styles.loading} aria-hidden="true" />;
  }

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
        <Link href="/products" className={styles.primary}>
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <ul className={styles.lines}>
        {items.map((line) => (
          <li key={line.key} className={styles.line}>
            <Link href={`/products/${line.slug}`} className={styles.thumb}>
              {line.image && (
                <Image src={line.image} alt={line.name} fill sizes="120px" className={styles.image} />
              )}
            </Link>

            <div className={styles.info}>
              <Link href={`/products/${line.slug}`} className={styles.name}>
                {line.name}
              </Link>
              {line.variantLabel && <p className={styles.variant}>{line.variantLabel}</p>}
              <p className={styles.unit}>
                {formatPrice(line.unitPrice)}
                {line.compareAtPrice !== null && (
                  <span className={styles.was}>{formatPrice(line.compareAtPrice)}</span>
                )}
              </p>

              <div className={styles.controls}>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    onClick={() => setQuantity(line.key, line.quantity - 1)}
                    disabled={line.quantity <= 1}
                    aria-label={`Decrease quantity of ${line.name}`}
                  >
                    −
                  </button>
                  <span aria-live="polite">{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(line.key, line.quantity + 1)}
                    disabled={line.quantity >= line.maxQuantity}
                    aria-label={`Increase quantity of ${line.name}`}
                  >
                    +
                  </button>
                </div>
                <button type="button" className={styles.remove} onClick={() => removeItem(line.key)}>
                  Remove
                </button>
              </div>
            </div>

            <p className={styles.total}>{formatPrice(line.unitPrice * line.quantity)}</p>
          </li>
        ))}
      </ul>

      <aside className={styles.summary}>
        <h2>Order summary</h2>
        <dl>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          {promo && (
            <div>
              <dt>Discount ({promo.code})</dt>
              <dd>−{formatPrice(discount)}</dd>
            </div>
          )}
          <div className={styles.grand}>
            <dt>Total before shipping</dt>
            <dd>{formatPrice(Math.max(0, subtotal - discount))}</dd>
          </div>
        </dl>
        <PromoCode />
        <p className={styles.note}>Shipping is added at checkout.</p>
      </aside>
    </div>
  );
}
