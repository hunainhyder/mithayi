import type { CartLine } from "@/types/api";

/** A cart line plus a snapshot of what is needed to display it. */
export interface CartItem extends CartLine {
  key: string;
  name: string;
  slug: string;
  image: string | null;
  /** Variant choice such as "Large / Gold", empty for simple products */
  variantLabel: string;
  unitPrice: number;
  compareAtPrice: number | null;
  /** Units available when the line was added, used to cap the quantity stepper */
  maxQuantity: number;
}

const STORAGE_KEY = "mithayi-cart";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

export function lineKey(productId: number, variantId: number | null): string {
  return `${productId}:${variantId ?? "base"}`;
}

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  items = read();
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    items = read();
    listeners.forEach((listener) => listener());
  });
}

function commit(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); the cart still works for this session
  }
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartItem[] {
  load();
  return items;
}

export function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function addItem(item: Omit<CartItem, "key">) {
  const key = lineKey(item.product_id, item.product_variant_id);
  const existing = items.find((line) => line.key === key);

  if (existing) {
    commit(
      items.map((line) =>
        line.key === key
          ? {
              ...line,
              ...item,
              key,
              quantity: Math.min(line.quantity + item.quantity, item.maxQuantity),
            }
          : line,
      ),
    );
    return;
  }

  commit([...items, { ...item, key, quantity: Math.min(item.quantity, item.maxQuantity) }]);
}

export function setQuantity(key: string, quantity: number) {
  commit(
    items.map((line) =>
      line.key === key
        ? { ...line, quantity: Math.max(1, Math.min(quantity, line.maxQuantity)) }
        : line,
    ),
  );
}

export function removeItem(key: string) {
  commit(items.filter((line) => line.key !== key));
}

export function clearCart() {
  commit(EMPTY);
}
