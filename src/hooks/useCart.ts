"use client";

import { useSyncExternalStore } from "react";
import {
  addItem,
  applyPromo,
  cartSignature,
  clearCart,
  clearPromo,
  getPromoSnapshot,
  getServerPromoSnapshot,
  getServerSnapshot,
  getSnapshot,
  removeItem,
  setQuantity,
  subscribe,
  subscribePromo,
} from "@/lib/cart-store";

const noopSubscribe = () => () => {};

/** True once the component is running in the browser, so it can trust the stored cart. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    items,
    count: items.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  };
}

/** The applied promo, or null when none is set or the cart changed since it was validated. */
export function usePromo() {
  const { items } = useCart();
  const stored = useSyncExternalStore(subscribePromo, getPromoSnapshot, getServerPromoSnapshot);
  const active = stored && stored.signature === cartSignature(items) ? stored : null;

  return { promo: active, stale: stored !== null && active === null, applyPromo, clearPromo };
}
