import { defaultSettings, type Settings } from "@/data/settings-defaults";

export interface ShippingMethod {
  /** Sent to the checkout API as shipping_method */
  id: string;
  label: string;
  description: string;
  /** Sent to the checkout API as shipping_cost */
  cost: number;
}

const DEFAULT_SHIPPING_COST = 350;

/** Reads a scalar the way the admin may have stored it: text, number, or an asset object with a url. */
function toText(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object" && "url" in value) {
    return toText((value as { url: unknown }).url);
  }
  return undefined;
}

/** Repeatable fields may arrive as a real array or as a JSON string. */
function toList(value: unknown): Record<string, string>[] | undefined {
  let list: unknown = value;
  if (typeof list === "string" && list.trim().startsWith("[")) {
    try {
      list = JSON.parse(list);
    } catch {
      return undefined;
    }
  }
  if (!Array.isArray(list)) return undefined;

  const items = list
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) =>
      Object.fromEntries(
        Object.entries(item).map(([key, field]) => [key, toText(field) ?? ""]),
      ),
    );
  return items.length > 0 ? items : undefined;
}

/**
 * Overlays the flat key/value payload from GET /api/settings on the defaults.
 * Keys that are missing or empty keep their default, so a partly filled admin
 * still renders a complete page.
 */
export function resolveSettings(payload: unknown): Settings {
  const source =
    payload && typeof payload === "object" && "data" in payload && !Array.isArray(payload.data)
      ? (payload.data as Record<string, unknown>)
      : ((payload ?? {}) as Record<string, unknown>);

  const resolved: Record<string, unknown> = { ...defaultSettings };
  for (const key of Object.keys(defaultSettings)) {
    const incoming = source[key];
    if (incoming === undefined || incoming === null) continue;
    const value = Array.isArray(defaultSettings[key as keyof Settings])
      ? toList(incoming)
      : toText(incoming);
    if (value !== undefined) resolved[key] = value;
  }
  return resolved as Settings;
}

/** Shipping options for checkout, built from the shipping settings. */
export function getShippingMethods(settings: Settings): ShippingMethod[] {
  const rate = parseFloat(settings.shipping_rate.replace(/[^\d.]/g, ""));
  return [
    {
      id: "standard",
      label: settings.shipping_label,
      description: settings.shipping_description,
      cost: Number.isFinite(rate) ? rate : DEFAULT_SHIPPING_COST,
    },
  ];
}

export const OCCASION_ICONS = ["moon", "bloom", "burst", "heart", "sparkle", "asterisk"] as const;
export type OccasionIcon = (typeof OCCASION_ICONS)[number];

export function toOccasionIcon(value: string): OccasionIcon {
  return (OCCASION_ICONS as readonly string[]).includes(value)
    ? (value as OccasionIcon)
    : "asterisk";
}
