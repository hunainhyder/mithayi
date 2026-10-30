import Image from "next/image";
import { instagramHandle, instagramImages } from "@/data/testimonials";
import { InstagramIcon } from "./Icons";
import styles from "./InstagramFeed.module.css";

export default function InstagramFeed() {
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className="eyebrow">Little moments, big feelings</p>
            <h2 className="section-title">
              Follow the <em>sweetness.</em>
            </h2>
          </div>
          <p className={styles.handle}>
            <InstagramIcon size={15} />
            {instagramHandle}
          </p>
        </header>

        <ul className={styles.grid}>
          {instagramImages.map((src, i) => (
            <li key={src} className={styles.tile}>
              <Image
                src={src}
                alt={`Mithayi on Instagram, photo ${i + 1}`}
                width={264}
                height={322}
                sizes="(max-width: 700px) 45vw, 264px"
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
