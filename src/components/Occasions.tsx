import Link from "next/link";
import { occasions } from "@/data/occasions";
import type { OccasionIcon } from "@/types";
import {
  ArrowRightIcon,
  AsteriskIcon,
  HeartIcon,
  MoonIcon,
  SparkleIcon,
} from "./Icons";
import styles from "./Occasions.module.css";

function OccasionGlyph({ icon }: { icon: OccasionIcon }) {
  switch (icon) {
    case "moon":
      return <MoonIcon size={24} strokeWidth={1.4} />;
    case "bloom":
      return <AsteriskIcon size={24} strokeWidth={3.4} />;
    case "burst":
      return <AsteriskIcon size={24} strokeWidth={1.3} />;
    case "heart":
      return <HeartIcon size={24} strokeWidth={1.4} />;
    case "sparkle":
      return <SparkleIcon size={24} />;
    case "asterisk":
      return <AsteriskIcon size={24} spokes={6} strokeWidth={2.8} />;
  }
}

export default function Occasions() {
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">Sweetness for every story</p>
          <h2 className="section-title">
            What are we <em>celebrating?</em>
          </h2>
        </header>

        <ul className={styles.grid}>
          {occasions.map((occasion) => (
            <li key={occasion.id} className={styles.cell}>
              <Link href={occasion.href} className={styles.link}>
                <span className={styles.icon}>
                  <OccasionGlyph icon={occasion.icon} />
                </span>
                <span className={styles.name}>{occasion.name}</span>
                <ArrowRightIcon size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
