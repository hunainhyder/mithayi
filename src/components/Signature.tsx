import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/data";
import { ArrowRightIcon, AsteriskIcon } from "./Icons";
import Title, { Lines } from "./Title";
import styles from "./Signature.module.css";

export default async function Signature() {
  const s = await getSettings();

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
              src={s.signature_image}
              alt={s.signature_image_alt}
              fill
              sizes="(max-width: 900px) 90vw, 560px"
              className={styles.image}
            />
          </div>
          {s.signature_badge_text && (
            <div className={styles.badge}>
              <span>
                <Lines text={s.signature_badge_text} />
              </span>
              <AsteriskIcon size={12} />
            </div>
          )}
        </div>

        <div className={styles.copy}>
          <p className="eyebrow">{s.signature_eyebrow}</p>
          <h2 className="section-title">
            <Title text={s.signature_title} accent={s.signature_title_accent} />
          </h2>
          <p className={styles.text}>{s.signature_description}</p>
          <ul className={styles.perks}>
            {s.signature_perks.map((perk) => (
              <li key={perk.text}>
                <AsteriskIcon size={13} className={styles.perkIcon} />
                {perk.text}
              </li>
            ))}
          </ul>
          {s.signature_link_text && (
            <Link href={s.signature_link_url} className={styles.link}>
              {s.signature_link_text} <ArrowRightIcon size={14} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
