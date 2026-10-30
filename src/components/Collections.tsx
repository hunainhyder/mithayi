import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";
import { ArrowRightIcon } from "./Icons";
import styles from "./Collections.module.css";

export default function Collections() {
  return (
    <section id="collections" className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">The good stuff starts here</p>
          <h2 className="section-title">
            Find your <em>kind of sweet.</em>
          </h2>
          <p className={styles.sub}>
            A little something for every taste, every person, every occasion.
          </p>
        </header>

        <ul className={styles.grid}>
          {collections.map((item, i) => (
            <li key={item.id}>
              <Link href={item.href} className={styles.card}>
                <div className={styles.thumb}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 220px"
                    className={styles.image}
                  />
                </div>
                <span className={styles.index}>
                  {String(i + 1).padStart(2, "0")} / Collection
                </span>
                <span className={styles.name}>
                  {item.name}
                  <ArrowRightIcon size={15} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
