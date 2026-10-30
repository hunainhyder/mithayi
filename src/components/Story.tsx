import Image from "next/image";
import { AsteriskIcon } from "./Icons";
import styles from "./Story.module.css";

export default function Story() {
  return (
    <section id="story" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">A story worth sharing</p>
          <h2 className="section-title">
            Rooted in
            <br />
            tradition.
            <br />
            <em>Made for today.</em>
          </h2>
          <span className={styles.rule} aria-hidden="true" />
          <div className={styles.body}>
            <p>
              Some things never go out of style. The joy of showing up with
              something sweet. The warmth of a shared table. The memories made in
              between.
            </p>
            <p>
              At Mithayi, we bring that timeless feeling to life, one lovingly
              made sweet and thoughtfully wrapped gift at a time.
            </p>
          </div>
          <p className={styles.sign}>
            Made with love, always.
            <AsteriskIcon size={16} />
          </p>
        </div>

        <figure className={styles.figure}>
          <div className={styles.photo}>
            <Image
              src="/images/story.jpg"
              alt="Gold leaf being placed on pistachio barfi by hand"
              fill
              sizes="(max-width: 900px) 90vw, 600px"
              className={styles.image}
            />
          </div>
          <figcaption className={styles.caption}>
            The beauty is in the details &mdash; 001
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
