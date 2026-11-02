"use client";

import { useSyncExternalStore } from "react";
import {
  addItem,
  clearCart,
  getServerSnapshot,
  getSnapshot,
  removeItem,
  setQuantity,
  subscribe,
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
