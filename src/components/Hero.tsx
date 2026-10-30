import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon, AsteriskIcon } from "./Icons";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.media}>
        <Image
          src="/images/hero.jpg"
          alt="An open red and gold box of assorted mithai"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
          className={styles.image}
        />
      </div>

      <AsteriskIcon size={38} className={styles.ornament} />

      <div className={`container ${styles.content}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Made to share. Made to remember.
        </p>
        <h1 className={styles.title}>
          Some moments
          <br />
          deserve a little
          <br />
          <em>more sweetness.</em>
        </h1>
        <p className={styles.lead}>
          Thoughtfully crafted mithai and gifts, made for every beautiful moment
          worth celebrating.
        </p>
        <div className={styles.actions}>
          <Link href="#collections" className={styles.primary}>
            Shop Mithai <ArrowRightIcon size={14} />
          </Link>
          <Link href="#gifting" className={styles.secondary}>
            Explore Gifts <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>

      <Link href="#collections" className={styles.scroll}>
        Scroll to explore <ArrowDownIcon size={13} />
      </Link>

      <p className={styles.vertical} aria-hidden="true">
        Handcrafted happiness · Est. in Pakistan
      </p>
    </section>
  );
}
