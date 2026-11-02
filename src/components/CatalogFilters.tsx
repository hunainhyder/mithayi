import { PRODUCT_SORTS, type CatalogFilters as Filters } from "@/lib/catalog";
import type { Category } from "@/types/api";
import { SearchIcon } from "./Icons";
import styles from "./CatalogFilters.module.css";

interface CatalogFiltersProps {
  /** Route the form submits to */
  action: string;
  filters: Filters;
  /** When given, a category select is shown (not needed on a category page) */
  categories?: Category[];
}

/** A plain GET form, so filtering works without client JavaScript. */
export default function CatalogFilters({
  action,
  filters,
  categories,
}: CatalogFiltersProps) {
  return (
    <form action={action} method="get" className={styles.form} id="search" role="search">
      <label className={`${styles.field} ${styles.search}`}>
        <span className={styles.label}>Search</span>
        <span className={styles.searchInput}>
          <SearchIcon size={16} />
          <input
            type="search"
            name="search"
            defaultValue={filters.search}
            placeholder="Search sweets and gifts"
          />
        </span>
      </label>

      {categories && categories.length > 0 && (
        <label className={styles.field}>
          <span className={styles.label}>Category</span>
          <select name="category" defaultValue={filters.category ?? ""}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className={`${styles.field} ${styles.price}`}>
        <span className={styles.label}>Price (Rs.)</span>
        <span className={styles.range}>
          <input
            type="number"
            name="min_price"
            min={0}
            inputMode="numeric"
            placeholder="Min"
            defaultValue={filters.min_price}
            aria-label="Minimum price"
          />
          <input
            type="number"
            name="max_price"
            min={0}
            inputMode="numeric"
            placeholder="Max"
            defaultValue={filters.max_price}
            aria-label="Maximum price"
          />
        </span>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Sort by</span>
        <select name="sort" defaultValue={filters.sort}>
          {PRODUCT_SORTS.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className={styles.apply}>
        Apply
      </button>
    </form>
  );
}
