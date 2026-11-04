import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getCategoryTree, getSettings } from "@/lib/data";
import CartButton from "./CartButton";
import { ChevronDownIcon, SearchIcon } from "./Icons";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.css";

export default async function Header() {
  const [settings, tree] = await Promise.all([getSettings(), getCategoryTree()]);

  const groups = tree.filter((node) => node.children.length > 0);
  const standalone = tree.filter((node) => node.children.length === 0);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <nav className={styles.nav} aria-label="Primary">
          <Suspense fallback={null}>
            <MobileMenu
              links={settings.nav_links}
              tree={tree}
              label={settings.nav_menu_label}
              shopAllLabel={settings.nav_shop_all_label}
              moreLabel={settings.nav_more_label}
            />
          </Suspense>
          {settings.nav_links.map((link) => {
            const hasMenu = link.url === "/products" && tree.length > 0;
            return (
              <div key={link.label} className={styles.item}>
                <Link href={link.url} className={styles.link}>
                  {link.label}
                  {hasMenu && <ChevronDownIcon size={12} />}
                </Link>

                {hasMenu && (
                  <div className={styles.menu}>
                    <div className={`container ${styles.columns}`}>
                      {groups.map((group) => (
                        <div key={group.id} className={styles.column}>
                          <Link href={`/categories/${group.slug}`} className={styles.heading}>
                            {group.name}
                          </Link>
                          <ul>
                            {group.children.map((child) => (
                              <li key={child.id}>
                                <Link href={`/categories/${child.slug}`}>{child.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {standalone.length > 0 && (
                        <div className={styles.column}>
                          <p className={styles.heading}>{settings.nav_more_label}</p>
                          <ul>
                            {standalone.map((category) => (
                              <li key={category.id}>
                                <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link href="/products" className={styles.shopAll}>
                        {settings.nav_shop_all_label}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <Link href="/" className={styles.logo} aria-label={`${settings.site_wordmark} home`}>
          {settings.site_logo ? (
            <Image
              src={settings.site_logo}
              alt={settings.site_wordmark}
              width={160}
              height={48}
              priority
              style={{ width: "auto", height: 48 }}
            />
          ) : (
            <span className={styles.wordmark}>{settings.site_wordmark}</span>
          )}
          {settings.site_tagline && (
            <span className={styles.tagline}>{settings.site_tagline}</span>
          )}
        </Link>

        <div className={styles.actions}>
          <Link
            href="/products#search"
            className={styles.iconButton}
            aria-label={settings.nav_search_label}
          >
            <SearchIcon size={18} />
          </Link>
          <CartButton label={settings.nav_cart_label} />
        </div>
      </div>
    </header>
  );
}
