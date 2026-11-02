"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import { compareAtPrice, effectiveUnitPrice } from "@/lib/pricing";
import type { ApiImage, Product } from "@/types/api";
import StarRating from "./StarRating";
import styles from "./ProductPurchase.module.css";

export default function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();

  const attributes = product.product_attributes ?? [];
  const variants = (product.variants ?? []).filter((v) => v.is_active);
  const hasVariants = attributes.length > 0 && variants.length > 0;

  // Attribute configs list every value in the catalogue; only offer the ones this product uses
  const usedValueIds = new Set(
    variants.flatMap((v) => v.attributes.map((a) => a.attribute_value_id)),
  );

  const attributeOfValue = new Map<number, number>();
  attributes.forEach((attr) =>
    attr.values.forEach((value) => attributeOfValue.set(value.id, attr.id)),
  );

  const [selected, setSelected] = useState<Record<number, number>>(() => {
    const start = variants.find((v) => v.stock > 0) ?? variants[0];
    if (!start || !hasVariants) return {};
    return Object.fromEntries(
      start.attributes.map((a) => [attributeOfValue.get(a.attribute_value_id), a.attribute_value_id]),
    );
  });
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const chosenIds = attributes.map((attr) => selected[attr.id]);
  const allChosen = hasVariants && chosenIds.every((id) => id !== undefined);
  const chosenKey = [...chosenIds].sort().join(",");

  const variant = allChosen
    ? (variants.find(
        (v) =>
          v.attributes
            .map((a) => a.attribute_value_id)
            .sort()
            .join(",") === chosenKey,
      ) ?? null)
    : null;

  const stock = hasVariants ? (variant?.stock ?? 0) : product.stock;
  const unitPrice = effectiveUnitPrice(product, variant);
  const wasPrice = compareAtPrice(product, variant);
  const qty = Math.min(quantity, Math.max(stock, 1));

  // A value is selectable when some in-stock variant pairs it with the other chosen values
  const isAvailable = (attrId: number, valueId: number) =>
    variants.some(
      (v) =>
        v.stock > 0 &&
        v.attributes.some((a) => a.attribute_value_id === valueId) &&
        attributes.every(
          (other) =>
            other.id === attrId ||
            selected[other.id] === undefined ||
            v.attributes.some((a) => a.attribute_value_id === selected[other.id]),
        ),
    );

  const baseImages: ApiImage[] = [
    ...(product.featured_image ? [product.featured_image] : []),
    ...(product.gallery ?? []),
  ].filter((img, i, all) => all.findIndex((other) => other.id === img.id) === i);
  const images = variant && variant.images.length > 0 ? variant.images : baseImages;
  const activeImage = images[imageIndex < images.length ? imageIndex : 0];

  const variantLabel = variant ? variant.attributes.map((a) => a.value).join(" / ") : "";
  const canBuy = stock > 0 && (!hasVariants || variant !== null);

  function handleAdd() {
    addItem({
      product_id: product.id,
      product_variant_id: variant?.id ?? null,
      quantity: qty,
      name: product.name,
      slug: product.slug,
      image: images[0]?.url ?? product.featured_image?.url ?? null,
      variantLabel,
      unitPrice,
      compareAtPrice: wasPrice,
      maxQuantity: stock,
    });
    setJustAdded(true);
  }

  return (
    <div className={styles.layout}>
      <div className={styles.gallery}>
        <div className={styles.main}>
          {activeImage && (
            <Image
              src={activeImage.url}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
            />
          )}
        </div>
        {images.length > 1 && (
          <ul className={styles.thumbs}>
            {images.map((img, i) => (
              <li key={img.id}>
                <button
                  type="button"
                  className={`${styles.thumb} ${img.id === activeImage?.id ? styles.thumbActive : ""}`}
                  onClick={() => setImageIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                >
                  <Image src={img.url} alt="" fill sizes="96px" className={styles.image} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.info}>
        {product.categories.length > 0 && (
          <p className="eyebrow">
            {product.categories.map((category, i) => (
              <span key={category.id}>
                {i > 0 && " · "}
                <Link href={`/categories/${category.slug}`}>{category.name}</Link>
              </span>
            ))}
          </p>
        )}
        <h1 className={styles.title}>{product.name}</h1>

        {product.average_rating !== null && (
          <a href="#reviews" className={styles.ratingLink}>
            <StarRating rating={product.average_rating} />
            <span>
              {product.average_rating.toFixed(1)} ({product.reviews_count}{" "}
              {product.reviews_count === 1 ? "review" : "reviews"})
            </span>
          </a>
        )}

        <p className={styles.price}>
          {formatPrice(unitPrice)}
          {wasPrice !== null && <span className={styles.was}>{formatPrice(wasPrice)}</span>}
        </p>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {hasVariants &&
          attributes.map((attr) => (
            <fieldset key={attr.id} className={styles.group}>
              <legend>
                {attr.name}
                {selected[attr.id] !== undefined && (
                  <span>
                    {" "}
                    · {attr.values.find((v) => v.id === selected[attr.id])?.value}
                  </span>
                )}
              </legend>
              <div className={styles.options}>
                {attr.values
                  .filter((value) => usedValueIds.has(value.id))
                  .map((value) => {
                  const available = isAvailable(attr.id, value.id);
                  const active = selected[attr.id] === value.id;
                  return (
                    <button
                      key={value.id}
                      type="button"
                      aria-pressed={active}
                      aria-label={`${attr.name}: ${value.value}${available ? "" : " (unavailable)"}`}
                      title={value.value}
                      disabled={!available}
                      onClick={() => {
                        setSelected((prev) => ({ ...prev, [attr.id]: value.id }));
                        setImageIndex(0);
                        setJustAdded(false);
                      }}
                      className={`${attr.is_color ? styles.swatch : styles.option} ${active ? styles.active : ""}`}
                      style={
                        attr.is_color && value.color_hex
                          ? { backgroundColor: value.color_hex }
                          : undefined
                      }
                    >
                      {!attr.is_color && value.value}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}

        <div className={styles.buy}>
          <div className={styles.stepper}>
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, qty - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span aria-live="polite">{qty}</span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(stock, qty + 1))}
              disabled={qty >= stock}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            className={styles.add}
            onClick={handleAdd}
            disabled={!canBuy}
          >
            {canBuy ? "Add to cart" : hasVariants && !variant ? "Unavailable" : "Sold out"}
          </button>
        </div>

        <p className={styles.stock} role="status">
          {justAdded ? (
            <>
              Added to your cart. <Link href="/cart">View cart</Link>
            </>
          ) : canBuy && stock <= 5 ? (
            `Only ${stock} left`
          ) : null}
        </p>

        {(product.notes ?? []).length > 0 && (
          <div className={styles.notes}>
            {product.notes!.map((note) => (
              <details key={note.id}>
                <summary>{note.title}</summary>
                <p>{note.content}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
