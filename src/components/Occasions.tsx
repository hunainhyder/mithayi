import Link from "next/link";
import { getSettings } from "@/lib/data";
import { toOccasionIcon, type OccasionIcon } from "@/lib/settings";
import {
  ArrowRightIcon,
  AsteriskIcon,
  HeartIcon,
  MoonIcon,
  SparkleIcon,
} from "./Icons";
import Title from "./Title";
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

export default async function Occasions() {
  const s = await getSettings();

  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">{s.occasions_eyebrow}</p>
          <h2 className="section-title">
            <Title text={s.occasions_title} accent={s.occasions_title_accent} inline />
          </h2>
        </header>

        <ul className={styles.grid}>
          {s.occasions_list.map((occasion, i) => (
            <li key={`${occasion.name}-${i}`} className={styles.cell}>
              <Link href={occasion.url || "#"} className={styles.link}>
                <span className={styles.icon}>
                  <OccasionGlyph icon={toOccasionIcon(occasion.icon)} />
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
