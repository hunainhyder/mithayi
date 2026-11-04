import { cacheLife } from "next/cache";
import { apiFetch, NotFoundError, toQuery } from "@/lib/api";
import { defaultSettings } from "@/data/settings-defaults";
import { resolveSettings } from "@/lib/settings";
import type {
  Category,
  CategoryMeta,
  Faq,
  Paginated,
  Post,
  Product,
} from "@/types/api";

export interface ProductQuery {
  search?: string;
  category_id?: number;
  is_featured?: boolean;
  min_price?: number;
  max_price?: number;
  sort?: string;
  per_page?: number;
  page?: number;
}

export interface CategoryQuery {
  search?: string;
  is_featured?: boolean;
  sort?: string;
  per_page?: number;
  page?: number;
}

export interface PostQuery {
  search?: string;
  sort?: string;
  per_page?: number;
  page?: number;
}

export type CategoryProducts = Paginated<Product> & { category: CategoryMeta };

function emptyPage<T>(): Paginated<T> {
  return {
    data: [],
    links: { first: "", last: "", prev: null, next: null },
    meta: { current_page: 1, last_page: 1, per_page: 0, total: 0, path: "" },
  };
}

// List reads fall back to an empty result so pages still render when the API is
// unreachable. Single-resource reads return null for a 404 and rethrow anything else.

export async function getCategories(query: CategoryQuery = {}) {
  "use cache";
  cacheLife("minutes");
  try {
    return await apiFetch<Paginated<Category>>(`categories${toQuery({ ...query })}`);
  } catch {
    return emptyPage<Category>();
  }
}

export async function getProducts(query: ProductQuery = {}) {
  "use cache";
  cacheLife("minutes");
  try {
    return await apiFetch<Paginated<Product>>(`products${toQuery({ ...query })}`);
  } catch {
    return emptyPage<Product>();
  }
}

export async function getFeaturedProducts() {
  "use cache";
  cacheLife("minutes");
  try {
    const res = await apiFetch<{ data: Product[] }>("products/featured");
    return res.data;
  } catch {
    return [];
  }
}

export async function getProduct(idOrSlug: string) {
  "use cache";
  cacheLife("minutes");
  try {
    const res = await apiFetch<{ data: Product }>(`products/${idOrSlug}`);
    return res.data;
  } catch (error) {
    if (error instanceof NotFoundError) return null;
    throw error;
  }
}

export async function getCategoryProducts(
  idOrSlug: string,
  query: Omit<ProductQuery, "category_id"> = {},
) {
  "use cache";
  cacheLife("minutes");
  try {
    return await apiFetch<CategoryProducts>(
      `categories/${idOrSlug}/products${toQuery({ ...query })}`,
    );
  } catch (error) {
    if (error instanceof NotFoundError) return null;
    throw error;
  }
}

export async function getPosts(query: PostQuery = {}) {
  "use cache";
  cacheLife("minutes");
  try {
    return await apiFetch<Paginated<Post>>(`posts${toQuery({ ...query })}`);
  } catch {
    return emptyPage<Post>();
  }
}

export async function getPost(slug: string) {
  "use cache";
  cacheLife("minutes");
  try {
    const res = await apiFetch<{ data: Post }>(`posts/${slug}`);
    return res.data;
  } catch (error) {
    if (error instanceof NotFoundError) return null;
    throw error;
  }
}

export async function getFaqs() {
  "use cache";
  cacheLife("hours");
  try {
    const res = await apiFetch<{ data: Faq[] } | Faq[]>("faqs");
    return Array.isArray(res) ? res : res.data;
  } catch {
    return [];
  }
}

/**
 * Tenant settings from GET /api/settings, merged over the built-in defaults.
 * Falls back to the defaults entirely when the API is unreachable.
 */
export async function getSettings() {
  "use cache";
  cacheLife("minutes");
  try {
    return resolveSettings(await apiFetch<unknown>("settings"));
  } catch {
    return resolveSettings(defaultSettings);
  }
}
