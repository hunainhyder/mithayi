"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { CategoryNode } from "@/lib/categories";
import { ChevronDownIcon } from "./Icons";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  links: { label: string; url: string }[];
  tree: CategoryNode[];
  label: string;
  shopAllLabel: string;
  moreLabel: string;
}

/** Phone navigation: a toggle button and a panel with the links and a category accordion. */
export default function MobileMenu({
  links,
  tree,
  label,
  shopAllLabel,
  moreLabel,
}: MobileMenuProps) {
  // Remembering the path it was opened on closes the panel after any navigation
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  const groups = tree.filter((node) => node.children.length > 0);
  const standalone = tree.filter((node) => node.children.length === 0);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-label={label}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpenAt(open ? null : pathname)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <path d="M5 5l14 14M19 5L5 19" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className={styles.panel}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpenAt(null);
          }}
        >
          <ul className={styles.list}>
            {links.map((link) =>
              link.url === "/products" && tree.length > 0 ? (
                <li key={link.label}>
                  <Link href={link.url} className={styles.top}>
                    {link.label}
                  </Link>
                  <div className={styles.shop}>
                    {groups.map((group) => (
                      <details key={group.id} className={styles.group}>
                        <summary>
                          {group.name}
                          <ChevronDownIcon size={14} />
                        </summary>
                        <ul>
                          <li>
                            <Link href={`/categories/${group.slug}`}>All {group.name}</Link>
                          </li>
                          {group.children.map((child) => (
                            <li key={child.id}>
                              <Link href={`/categories/${child.slug}`}>{child.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ))}

                    {standalone.length > 0 && (
                      <details className={styles.group}>
                        <summary>
                          {moreLabel}
                          <ChevronDownIcon size={14} />
                        </summary>
                        <ul>
                          {standalone.map((category) => (
                            <li key={category.id}>
                              <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}

                    <Link href="/products" className={styles.shopAll}>
                      {shopAllLabel}
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={link.label}>
                  <Link href={link.url} className={styles.top}>
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </>
  );
}
