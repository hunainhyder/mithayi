import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/data";
import { ArrowRightIcon } from "./Icons";
import { Lines } from "./Title";
import styles from "./Festive.module.css";

export default async function Festive() {
  const s = await getSettings();

  return (
    <section id="festive" className={styles.section}>
      <div className={styles.media}>
        <Image
          src={s.festive_image}
          alt={s.festive_image_alt}
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          className={styles.image}
        />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>{s.festive_eyebrow}</p>
        <h2 className={styles.title}>
          {s.festive_title_line_1}
          <br />
          {s.festive_title_line_2_before} <em>{s.festive_title_accent}</em>
          <br />
          {s.festive_title_line_3}
        </h2>
        <p className={styles.text}>
          <Lines text={s.festive_description} />
        </p>
        {s.festive_button_text && (
          <Link href={s.festive_button_url} className={styles.button}>
            {s.festive_button_text} <ArrowRightIcon size={14} />
          </Link>
        )}
      </div>
    </section>
  );
}
