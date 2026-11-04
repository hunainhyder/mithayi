import { getSettings } from "@/lib/data";
import type { TextItem } from "@/data/settings-defaults";
import { AsteriskIcon } from "./Icons";
import styles from "./Marquee.module.css";

function Run({ items, hidden = false }: { items: TextItem[]; hidden?: boolean }) {
  return (
    <ul className={styles.run} aria-hidden={hidden || undefined}>
      {[...items, ...items].map((item, i) => (
        <li key={i} className={styles.item}>
          <span>{item.text}</span>
          <AsteriskIcon size={14} className={styles.star} />
        </li>
      ))}
    </ul>
  );
}

export default async function Marquee() {
  const { marquee_items } = await getSettings();

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <Run items={marquee_items} />
        <Run items={marquee_items} hidden />
      </div>
    </div>
  );
}
