import Link from "next/link";
import { getSettings } from "@/lib/data";
import { AsteriskIcon } from "./Icons";
import { Lines } from "./Title";
import styles from "./Footer.module.css";

export default async function Footer() {
  const s = await getSettings();

  const columns = [
    { title: s.footer_column_1_title, links: s.footer_column_1_links },
    { title: s.footer_column_2_title, links: s.footer_column_2_links },
  ].filter((column) => column.links.length > 0);

  const contactLines = [
    s.contact_address,
    s.contact_hours,
  ].filter(Boolean);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>
            {s.site_wordmark}
            <AsteriskIcon size={22} strokeWidth={3} className={styles.mark} />
          </p>
          <p className={styles.tagline}>
            <Lines text={s.footer_tagline} />
          </p>

          {(s.contact_email || s.contact_phone || s.contact_whatsapp || contactLines.length > 0) && (
            <address className={styles.contact}>
              {s.contact_email && <a href={`mailto:${s.contact_email}`}>{s.contact_email}</a>}
              {s.contact_phone && <a href={`tel:${s.contact_phone}`}>{s.contact_phone}</a>}
              {s.contact_whatsapp && (
                <a href={`https://wa.me/${s.contact_whatsapp.replace(/\D/g, "")}`}>
                  WhatsApp {s.contact_whatsapp}
                </a>
              )}
              {contactLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          )}

          {s.social_media_links.length > 0 && (
            <ul className={styles.social}>
              {s.social_media_links.map((link) => (
                <li key={link.url || link.platform}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title || link.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <p className={styles.heading}>{column.title}</p>
              <ul className={styles.links}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>{s.footer_copyright}</p>
        <p className={styles.sign}>
          {s.footer_signoff}
          <AsteriskIcon size={13} className={styles.signMark} />
        </p>
      </div>
    </footer>
  );
}
