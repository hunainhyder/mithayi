import { marqueeItems } from "@/data/site";
import { AsteriskIcon } from "./Icons";
import styles from "./Marquee.module.css";

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.run} aria-hidden={hidden || undefined}>
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <li key={i} className={styles.item}>
          <span>{item}</span>
          <AsteriskIcon size={14} className={styles.star} />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
