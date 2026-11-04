import Image from "next/image";
import { getSettings } from "@/lib/data";
import { AsteriskIcon } from "./Icons";
import Title from "./Title";
import styles from "./Story.module.css";

export default async function Story() {
  const s = await getSettings();

  return (
    <section id="story" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{s.story_eyebrow}</p>
          <h2 className="section-title">
            <Title text={s.story_title} accent={s.story_title_accent} />
          </h2>
          <span className={styles.rule} aria-hidden="true" />
          <div className={styles.body}>
            {[s.story_paragraph_1, s.story_paragraph_2].filter(Boolean).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {s.story_signoff && (
            <p className={styles.sign}>
              {s.story_signoff}
              <AsteriskIcon size={16} />
            </p>
          )}
        </div>

        <figure className={styles.figure}>
          <div className={styles.photo}>
            <Image
              src={s.story_image}
              alt={s.story_image_alt}
              fill
              sizes="(max-width: 900px) 90vw, 600px"
              className={styles.image}
            />
          </div>
          {s.story_image_caption && (
            <figcaption className={styles.caption}>{s.story_image_caption}</figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
