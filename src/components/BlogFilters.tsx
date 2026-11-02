import { POST_SORTS, type BlogFilters as Filters } from "@/lib/blog";
import { SearchIcon } from "./Icons";
import styles from "./CatalogFilters.module.css";

/** A plain GET form, so it works without client JavaScript. */
export default function BlogFilters({ filters }: { filters: Filters }) {
  return (
    <form action="/blog" method="get" className={styles.form} role="search">
      <label className={`${styles.field} ${styles.search}`}>
        <span className={styles.label}>Search</span>
        <span className={styles.searchInput}>
          <SearchIcon size={16} />
          <input
            type="search"
            name="search"
            defaultValue={filters.search}
            placeholder="Search the journal"
          />
        </span>
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Sort by</span>
        <select name="sort" defaultValue={filters.sort}>
          {POST_SORTS.map((sort) => (
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
