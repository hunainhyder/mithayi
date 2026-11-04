import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/data";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";
import Title from "./Title";
import styles from "./Gifting.module.css";

export default async function Gifting() {
  const s = await getSettings();
  const slides = s.gifting_slides;

  return (
    <section id="gifting" className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className="eyebrow">{s.gifting_eyebrow}</p>
            <h2 className="section-title">
              <Title text={s.gifting_title} accent={s.gifting_title_accent} inline />
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
          {slides.map((slide, i) => (
            <li
              key={`${slide.kicker}-${i}`}
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
                  {[slide.title_line_1, slide.title_line_2].filter(Boolean).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                {slide.button_text && (
                  <Link href={slide.button_url || "#"} className={styles.cta}>
                    {slide.button_text} <ArrowRightIcon size={13} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.progress} aria-hidden="true">
          <span>01</span>
          <span className={styles.track}>
            <span className={styles.fill} />
          </span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
