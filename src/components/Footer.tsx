import Link from "next/link";
import { footerColumns } from "@/data/site";
import { AsteriskIcon } from "./Icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>
            Mithayi
            <AsteriskIcon size={22} strokeWidth={3} className={styles.mark} />
          </p>
          <p className={styles.tagline}>
            A little sweetness goes a long way.
            <br />
            Made to share, made to remember.
          </p>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {footerColumns.map((column) => (
            <div key={column.title} className={styles.column}>
              <p className={styles.heading}>{column.title}</p>
              <ul className={styles.links}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; 2026 Mithayi. Made with love.</p>
        <p className={styles.sign}>
          The art of sweet gifting
          <AsteriskIcon size={13} className={styles.signMark} />
        </p>
      </div>
    </footer>
  );
}
