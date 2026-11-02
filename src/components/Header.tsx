import Link from "next/link";
import { navLinks } from "@/data/site";
import { BagIcon, ChevronDownIcon, SearchIcon } from "./Icons";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <nav className={styles.nav} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={styles.link}>
              {link.label}
              {link.hasMenu && <ChevronDownIcon size={12} />}
            </Link>
          ))}
        </nav>

        <Link href="/" className={styles.logo} aria-label="Mithayi home">
          <span className={styles.wordmark}>Mithayi</span>
          <span className={styles.tagline}>Est. with love</span>
        </Link>

        <div className={styles.actions}>
          <Link href="/products#search" className={styles.iconButton} aria-label="Search">
            <SearchIcon size={18} />
          </Link>
          <button type="button" className={styles.iconButton} aria-label="Cart, 0 items">
            <BagIcon size={18} />
            <span className={styles.count}>0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
