import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/data";
import { ArrowDownIcon, ArrowRightIcon, AsteriskIcon } from "./Icons";
import Title, { Lines } from "./Title";
import styles from "./Hero.module.css";

export default async function Hero() {
  const s = await getSettings();

  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <Image
          src={s.hero_image}
          alt={s.hero_image_alt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
          className={styles.image}
        />
      </div>

      <AsteriskIcon size={38} className={styles.ornament} />

      <div className={`container ${styles.content}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{s.hero_eyebrow}</p>
        <h1 className={styles.title}>
          <Title text={s.hero_title} accent={s.hero_title_accent} />
        </h1>
        <p className={styles.lead}>{s.hero_description}</p>
        <div className={styles.actions}>
          {s.hero_primary_button_text && (
            <Link href={s.hero_primary_button_url} className={styles.primary}>
              {s.hero_primary_button_text} <ArrowRightIcon size={14} />
            </Link>
          )}
          {s.hero_secondary_button_text && (
            <Link href={s.hero_secondary_button_url} className={styles.secondary}>
              {s.hero_secondary_button_text} <ArrowRightIcon size={14} />
            </Link>
          )}
        </div>
      </div>

      <Link href={s.hero_primary_button_url} className={styles.scroll}>
        {s.hero_scroll_text} <ArrowDownIcon size={13} />
      </Link>

      <p className={styles.vertical} aria-hidden="true">
        <Lines text={s.hero_vertical_text} />
      </p>
    </section>
  );
}
