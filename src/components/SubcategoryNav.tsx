import Link from "next/link";
import type { CategoryNode } from "@/lib/categories";
import styles from "./SubcategoryNav.module.css";

/** Chips for moving between a top-level category and its sub-categories. */
export default function SubcategoryNav({
  family,
  activeSlug,
}: {
  family: CategoryNode;
  activeSlug: string;
}) {
  if (family.children.length === 0) return null;

  return (
    <nav className={styles.nav} aria-label={`${family.name} categories`}>
      <ul className={styles.list}>
        <li>
          <Link
            href={`/categories/${family.slug}`}
            className={`${styles.chip} ${activeSlug === family.slug ? styles.active : ""}`}
            aria-current={activeSlug === family.slug ? "page" : undefined}
          >
            All {family.name}
          </Link>
        </li>
        {family.children.map((child) => (
          <li key={child.id}>
            <Link
              href={`/categories/${child.slug}`}
              className={`${styles.chip} ${activeSlug === child.slug ? styles.active : ""}`}
              aria-current={activeSlug === child.slug ? "page" : undefined}
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
