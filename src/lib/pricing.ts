import type { Product, ProductVariant } from "@/types/api";

type Priced = Pick<Product, "price" | "discounted_price">;
type VariantPriced = Pick<ProductVariant, "price" | "discounted_price">;

/**
 * Unit price the checkout will charge. A variant with its own price uses its own
 * discount; otherwise (no variant, or variant.price === null) it inherits the product.
 */
export function effectiveUnitPrice(
  product: Priced,
  variant: VariantPriced | null,
): number {
  if (variant && variant.price !== null) {
    return variant.discounted_price ?? variant.price;
  }
  return product.discounted_price ?? product.price;
}

/** Pre-discount price shown struck through, or null when there is no discount. */
export function compareAtPrice(
  product: Priced,
  variant: VariantPriced | null,
): number | null {
  const base = variant && variant.price !== null ? variant.price : product.price;
  return effectiveUnitPrice(product, variant) < base ? base : null;
}
