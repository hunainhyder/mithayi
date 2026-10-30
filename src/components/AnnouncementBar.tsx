import { announcements } from "@/data/site";
import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <ul className={styles.list}>
        {announcements.map((text, i) => (
          <li key={i} className={styles.item}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
