import type { ProductQuery } from "@/lib/data";

export const PRODUCT_SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
  { value: "name_asc", label: "A to Z" },
  { value: "name_desc", label: "Z to A" },
] as const;

export const PRODUCTS_PER_PAGE = 12;

export type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toNumber(value: string | undefined): number | undefined {
  if (value === undefined || value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export interface CatalogFilters {
  search?: string;
  sort: string;
  min_price?: number;
  max_price?: number;
  category?: number;
  page: number;
}

export function parseCatalogParams(params: SearchParams): CatalogFilters {
  const sort = first(params.sort);
  return {
    search: first(params.search)?.trim() || undefined,
    sort: PRODUCT_SORTS.some((s) => s.value === sort) ? (sort as string) : "newest",
    min_price: toNumber(first(params.min_price)),
    max_price: toNumber(first(params.max_price)),
    category: toNumber(first(params.category)),
    page: Math.max(1, Math.floor(toNumber(first(params.page)) ?? 1)),
  };
}

/** The filter state worth keeping in pagination links (page is added per link). */
export function filtersToParams(filters: CatalogFilters) {
  return {
    search: filters.search,
    sort: filters.sort === "newest" ? undefined : filters.sort,
    min_price: filters.min_price,
    max_price: filters.max_price,
    category: filters.category,
  };
}

export function filtersToProductQuery(filters: CatalogFilters): ProductQuery {
  return {
    search: filters.search,
    sort: filters.sort,
    min_price: filters.min_price,
    max_price: filters.max_price,
    category_id: filters.category,
    page: filters.page,
    per_page: PRODUCTS_PER_PAGE,
  };
}

/** Category pages fix the category in the URL, so category_id is left out. */
export function filtersToCategoryProductQuery(
  filters: CatalogFilters,
): Omit<ProductQuery, "category_id"> {
  return {
    search: filters.search,
    sort: filters.sort,
    min_price: filters.min_price,
    max_price: filters.max_price,
    page: filters.page,
    per_page: PRODUCTS_PER_PAGE,
  };
}
