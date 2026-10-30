import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import styles from "./Festive.module.css";

export default function Festive() {
  return (
    <section id="festive" className={styles.section}>
      <div className={styles.media}>
        <Image
          src="/images/festive.jpg"
          alt="A green and gold box of festive mithai beside a lantern"
          fill
          sizes="(max-width: 900px) 100vw, 60vw"
          className={styles.image}
        />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>For the moments that matter</p>
        <h2 className={styles.title}>
          Every celebration
          <br />
          tastes <em>sweeter</em>
          <br />
          together.
        </h2>
        <p className={styles.text}>
          From the first moon sighting to the last dance,
          <br />
          make their day a little more magical.
        </p>
        <Link href="#gifting" className={styles.button}>
          Explore festive gifts <ArrowRightIcon size={14} />
        </Link>
      </div>
    </section>
  );
}
