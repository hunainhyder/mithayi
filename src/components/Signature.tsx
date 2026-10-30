import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, AsteriskIcon } from "./Icons";
import styles from "./Signature.module.css";

const perks = ["Small-batch crafted", "Beautifully gifted", "Made for sharing"];

export default function Signature() {
  return (
    <section className={styles.section}>
      <AsteriskIcon
        size={420}
        strokeWidth={1.2}
        className={styles.watermark}
        aria-hidden="true"
      />

      <div className={`container ${styles.layout}`}>
        <div className={styles.frame}>
          <div className={styles.photo}>
            <Image
              src="/images/signature.jpg"
              alt="A brass platter of pistachio barfi, kaju katli, rose and gulab jamun"
              fill
              sizes="(max-width: 900px) 90vw, 560px"
              className={styles.image}
            />
          </div>
          <div className={styles.badge}>
            <span>
              Made
              <br />
              with
              <br />
              love
            </span>
            <AsteriskIcon size={12} />
          </div>
        </div>

        <div className={styles.copy}>
          <p className="eyebrow">The Mithayi signature</p>
          <h2 className="section-title">
            Not just mithai.
            <br />
            <em>A feeling.</em>
          </h2>
          <p className={styles.text}>
            That first bite. That familiar smile. That instant feeling of home.
            We take the sweets you&rsquo;ve always loved and make them feel like
            a whole new celebration.
          </p>
          <ul className={styles.perks}>
            {perks.map((perk) => (
              <li key={perk}>
                <AsteriskIcon size={13} className={styles.perkIcon} />
                {perk}
              </li>
            ))}
          </ul>
          <Link href="#favourites" className={styles.link}>
            Discover our mithai <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
