import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/data";
import CartButton from "./CartButton";
import { ChevronDownIcon, SearchIcon } from "./Icons";
import styles from "./Header.module.css";

export default async function Header() {
  const settings = await getSettings();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <nav className={styles.nav} aria-label="Primary">
          {settings.nav_links.map((link) => (
            <Link key={link.label} href={link.url} className={styles.link}>
              {link.label}
              {link.url === "/products" && <ChevronDownIcon size={12} />}
            </Link>
          ))}
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
