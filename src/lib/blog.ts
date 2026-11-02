import type { PostQuery } from "@/lib/data";
import type { SearchParams } from "@/lib/catalog";

export const POST_SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "alpha_asc", label: "A to Z" },
  { value: "alpha_desc", label: "Z to A" },
] as const;

export const POSTS_PER_PAGE = 9;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export interface BlogFilters {
  search?: string;
  sort: string;
  page: number;
}

export function parseBlogParams(params: SearchParams): BlogFilters {
  const sort = first(params.sort);
  const page = Number(first(params.page));
  return {
    search: first(params.search)?.trim() || undefined,
    sort: POST_SORTS.some((s) => s.value === sort) ? (sort as string) : "newest",
    page: Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1,
  };
}

export function blogFiltersToQuery(filters: BlogFilters): PostQuery {
  return {
    search: filters.search,
    sort: filters.sort,
    page: filters.page,
    per_page: POSTS_PER_PAGE,
  };
}

/** Filter state kept on pagination links. */
export function blogFiltersToParams(filters: BlogFilters) {
  return {
    search: filters.search,
    sort: filters.sort === "newest" ? undefined : filters.sort,
  };
}
