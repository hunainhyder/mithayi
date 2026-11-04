"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart, useHydrated, usePromo } from "@/hooks/useCart";
import { ApiError, ValidationError, apiFetch } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import type { ShippingMethod } from "@/lib/settings";
import type { CheckoutPayload, CheckoutResponse } from "@/types/api";
import PromoCode from "./PromoCode";
import form from "./Form.module.css";
import styles from "./CheckoutForm.module.css";

export interface CheckoutCopy {
  emptyMessage: string;
  emptyButtonText: string;
  successEyebrow: string;
  successTitle: string;
  successTitleAccent: string;
  /** Overrides the message returned by the checkout API when set */
  successMessage: string;
}

export default function CheckoutForm({
  shippingMethods,
  copy,
}: {
  shippingMethods: ShippingMethod[];
  copy: CheckoutCopy;
}) {
  const hydrated = useHydrated();
  const { items, subtotal, clearCart } = useCart();
  const { promo } = usePromo();

  const [shippingId, setShippingId] = useState(shippingMethods[0].id);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [itemErrors, setItemErrors] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [order, setOrder] = useState<CheckoutResponse | null>(null);

  const shipping = shippingMethods.find((method) => method.id === shippingId)!;
  const discount = promo?.discountAmount ?? 0;
  const estimatedTotal = Math.max(0, subtotal - discount) + shipping.cost;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    const payload: CheckoutPayload = {
      customer: {
        name: field("name"),
        email: field("email"),
        phone: field("phone"),
        address: field("address"),
      },
      items: items.map((line) => ({
        product_id: line.product_id,
        product_variant_id: line.product_variant_id,
        quantity: line.quantity,
      })),
      shipping_method: shipping.id,
      shipping_cost: shipping.cost,
      ...(promo && { coupon_code: promo.code }),
    };

    setPending(true);
    setMessage(null);
    setItemErrors([]);
    setErrors({});
    try {
      const result = await apiFetch<CheckoutResponse>("checkout", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      // The 201 response carries the final totals, so it is shown as-is (no re-fetch)
      setOrder(result);
      clearCart();
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error.errors);
        setItemErrors(error.errors.items ?? []);
        setMessage(error.message);
      } else {
        setMessage(
          error instanceof ApiError ? error.message : "Something went wrong. Please try again.",
        );
      }
    } finally {
      setPending(false);
    }
  }

  if (order) {
    return (
      <div className={styles.confirmation}>
        <p className="eyebrow">{copy.successEyebrow}</p>
        <h2 className="section-title">
          {copy.successTitle} <em>{copy.successTitleAccent}</em>
        </h2>
        <p>
          {copy.successMessage || order.message} Your order number is <strong>#{order.order_id}</strong>.
        </p>
        <dl className={styles.totals}>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(order.subtotal)}</dd>
          </div>
          {order.discount_amount > 0 && (
            <div>
              <dt>
                Discount
                {order.promotion_applied?.code && ` (${order.promotion_applied.code})`}
              </dt>
              <dd>−{formatPrice(order.discount_amount)}</dd>
            </div>
          )}
          <div>
            <dt>Shipping</dt>
            <dd>{formatPrice(order.shipping_cost)}</dd>
          </div>
          <div className={styles.grand}>
            <dt>Total</dt>
            <dd>{formatPrice(order.total_amount)}</dd>
          </div>
        </dl>
        <Link href="/products" className={form.submit}>
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!hydrated) return <div style={{ minHeight: 320 }} aria-hidden="true" />;

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{copy.emptyMessage}</p>
        <Link href="/products" className={form.submit}>
          {copy.emptyButtonText}
        </Link>
      </div>
    );
  }

  const fieldError = (name: string) =>
    errors[name]?.[0] && <span className={form.error}>{errors[name][0]}</span>;

  return (
    <div className={styles.layout}>
      <form className={form.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Delivery details</h2>

        {message && (
          <div className={`${form.status} ${form.failure}`} role="alert">
            <p>{message}</p>
            {itemErrors.length > 1 && (
              <ul className={styles.errorList}>
                {itemErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            {itemErrors.length > 0 && (
              <p>
                <Link href="/cart">Review your cart</Link>
              </p>
            )}
          </div>
        )}

        <div className={form.row}>
          <label className={form.field}>
            <span className={form.label}>Full name</span>
            <input className={form.input} name="name" required autoComplete="name" />
            {fieldError("customer.name")}
          </label>
          <label className={form.field}>
            <span className={form.label}>Email</span>
            <input className={form.input} type="email" name="email" required autoComplete="email" />
            {fieldError("customer.email")}
          </label>
        </div>
        <label className={form.field}>
          <span className={form.label}>Phone</span>
          <input className={form.input} type="tel" name="phone" required autoComplete="tel" />
          {fieldError("customer.phone")}
        </label>
        <label className={form.field}>
          <span className={form.label}>Delivery address</span>
          <textarea className={form.input} name="address" required autoComplete="street-address" />
          {fieldError("customer.address")}
        </label>

        <fieldset className={styles.shipping}>
          <legend className={form.label}>Shipping</legend>
          {shippingMethods.map((method) => (
            <label key={method.id} className={styles.method}>
              <input
                type="radio"
                name="shipping"
                value={method.id}
                checked={shippingId === method.id}
                onChange={() => setShippingId(method.id)}
              />
              <span>
                <strong>{method.label}</strong>
                <small>{method.description}</small>
              </span>
              <span>{formatPrice(method.cost)}</span>
            </label>
          ))}
        </fieldset>

        <button type="submit" className={form.submit} disabled={pending}>
          {pending ? "Placing order…" : `Place order · ${formatPrice(estimatedTotal)}`}
        </button>
      </form>

      <aside className={styles.summary}>
        <h2>Your order</h2>
        <ul className={styles.items}>
          {items.map((line) => (
            <li key={line.key}>
              <span>
                {line.name} × {line.quantity}
                {line.variantLabel && <small>{line.variantLabel}</small>}
              </span>
              <span>{formatPrice(line.unitPrice * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className={styles.totals}>
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
          <div>
            <dt>Shipping</dt>
            <dd>{formatPrice(shipping.cost)}</dd>
          </div>
          <div className={styles.grand}>
            <dt>Total</dt>
            <dd>{formatPrice(estimatedTotal)}</dd>
          </div>
        </dl>
        <PromoCode />
      </aside>
    </div>
  );
}
