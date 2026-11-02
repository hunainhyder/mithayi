import Link from "next/link";
import { toQuery } from "@/lib/api";
import type { Paginated } from "@/types/api";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";
import styles from "./Pagination.module.css";

interface PaginationProps {
  meta: Paginated<unknown>["meta"];
  basePath: string;
  /** Active filters to keep on every link */
  params?: Record<string, string | number | undefined>;
}

function pageWindow(current: number, last: number): (number | "gap")[] {
  const pages = new Set([1, last, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) out.push("gap");
    out.push(page);
  });
  return out;
}

export default function Pagination({ meta, basePath, params = {} }: PaginationProps) {
  if (meta.last_page <= 1) return null;

  const href = (page: number) =>
    `${basePath}${toQuery({ ...params, page: page > 1 ? page : undefined })}`;

  return (
    <nav className={styles.nav} aria-label="Pagination">
      {meta.current_page > 1 && (
        <Link href={href(meta.current_page - 1)} className={styles.step} aria-label="Previous page">
          <ArrowLeftIcon size={14} />
        </Link>
      )}

      {pageWindow(meta.current_page, meta.last_page).map((page, i) =>
        page === "gap" ? (
          <span key={`gap-${i}`} className={styles.gap}>
            …
          </span>
        ) : (
          <Link
            key={page}
            href={href(page)}
            className={`${styles.page} ${page === meta.current_page ? styles.current : ""}`}
            aria-current={page === meta.current_page ? "page" : undefined}
          >
            {page}
          </Link>
        ),
      )}

      {meta.current_page < meta.last_page && (
        <Link href={href(meta.current_page + 1)} className={styles.step} aria-label="Next page">
          <ArrowRightIcon size={14} />
        </Link>
      )}
    </nav>
  );
}
