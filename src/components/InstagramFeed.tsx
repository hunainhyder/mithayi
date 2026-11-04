import Image from "next/image";
import { getSettings } from "@/lib/data";
import { InstagramIcon } from "./Icons";
import Title from "./Title";
import styles from "./InstagramFeed.module.css";

export default async function InstagramFeed() {
  const s = await getSettings();

  const handle = (
    <>
      <InstagramIcon size={15} />
      {s.instagram_handle}
    </>
  );

  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className="eyebrow">{s.instagram_eyebrow}</p>
            <h2 className="section-title">
              <Title text={s.instagram_title} accent={s.instagram_title_accent} inline />
            </h2>
          </div>
          <p className={styles.handle}>
            {s.instagram_profile_url ? (
              <a href={s.instagram_profile_url} target="_blank" rel="noopener noreferrer">
                {handle}
              </a>
            ) : (
              handle
            )}
          </p>
        </header>

        <ul className={styles.grid}>
          {s.instagram_images.map((photo, i) => {
            const image = (
              <Image
                src={photo.image}
                alt={photo.alt}
                width={264}
                height={322}
                sizes="(max-width: 700px) 45vw, 264px"
                className={styles.image}
              />
            );
            return (
              <li key={`${photo.image}-${i}`} className={styles.tile}>
                {photo.url ? (
                  <a href={photo.url} target="_blank" rel="noopener noreferrer">
                    {image}
                  </a>
                ) : (
                  image
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
