"use client";

import { useState, type FormEvent } from "react";
import { useCart, usePromo } from "@/hooks/useCart";
import { ApiError, apiFetch } from "@/lib/api";
import { cartSignature } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import type { ValidatePromotionResponse } from "@/types/api";
import styles from "./PromoCode.module.css";

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CODE: "This promo code is not valid.",
  CODE_EXPIRED: "This promo code has expired.",
  CODE_MAX_USES_REACHED: "This promo code is no longer available.",
  CODE_MAX_USES_PER_CUSTOMER_REACHED: "You have already used this code.",
  CODE_MIN_ORDER_NOT_MET: "Your order does not meet the minimum spend for this code.",
  CODE_NO_ELIGIBLE_ITEMS: "This code does not apply to any items in your cart.",
};

export default function PromoCode() {
  const { items } = useCart();
  const { promo, stale, applyPromo, clearPromo } = usePromo();
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed || items.length === 0) return;

    setPending(true);
    setError(null);
    try {
      const result = await apiFetch<ValidatePromotionResponse>("promotions/validate", {
        method: "POST",
        body: JSON.stringify({
          code: trimmed,
          items: items.map((line) => ({
            product_id: line.product_id,
            product_variant_id: line.product_variant_id,
            quantity: line.quantity,
          })),
        }),
      });

      if (!result.valid || !result.promotion) {
        setError(
          ERROR_MESSAGES[result.error ?? ""] ?? "This promo code could not be applied.",
        );
        return;
      }

      applyPromo({
        code: result.promotion.code,
        description: result.promotion.description,
        discountAmount: result.promotion.discount_amount,
        signature: cartSignature(items),
      });
      setCode("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (promo) {
    return (
      <div className={styles.applied}>
        <p>
          <strong>{promo.code}</strong> applied. {promo.description}
          <br />
          You save {formatPrice(promo.discountAmount)}.
        </p>
        <button type="button" onClick={clearPromo}>
          Remove
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="promo-code">
        Promo code
      </label>
      <div className={styles.row}>
        <input
          id="promo-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter code"
          autoComplete="off"
        />
        <button type="submit" disabled={pending || !code.trim()}>
          {pending ? "Checking…" : "Apply"}
        </button>
      </div>
      {stale && !error && (
        <p className={styles.hint}>Your cart changed. Please apply your code again.</p>
      )}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
