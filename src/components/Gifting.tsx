import Image from "next/image";
import Link from "next/link";
import { giftSlides, giftSlideTotal } from "@/data/gifting";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";
import styles from "./Gifting.module.css";

export default function Gifting() {
  return (
    <section id="gifting" className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className="eyebrow">A little joy, beautifully wrapped</p>
            <h2 className="section-title">
              The art of <em>giving.</em>
            </h2>
          </div>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} aria-label="Previous">
              <ArrowLeftIcon size={15} />
            </button>
            <button type="button" className={styles.arrow} aria-label="Next">
              <ArrowRightIcon size={15} />
            </button>
          </div>
        </header>

        <ul className={styles.cards}>
          {giftSlides.map((slide, i) => (
            <li
              key={slide.id}
              className={`${styles.card} ${i === 0 ? styles.wide : styles.narrow}`}
            >
              <div className={styles.media}>
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 100vw, 60vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.overlay} />
              <div className={styles.caption}>
                <p className={styles.kicker}>{slide.kicker}</p>
                <h3 className={styles.title}>
                  {slide.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <Link href={slide.href} className={styles.cta}>
                  {slide.cta} <ArrowRightIcon size={13} />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.progress} aria-hidden="true">
          <span>01</span>
          <span className={styles.track}>
            <span className={styles.fill} />
          </span>
          <span>{String(giftSlideTotal).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
