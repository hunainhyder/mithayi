import { getSettings } from "@/lib/data";
import styles from "./AnnouncementBar.module.css";

export default async function AnnouncementBar() {
  const { site_announcements } = await getSettings();

  return (
    <div className={styles.bar}>
      <ul className={styles.list}>
        {site_announcements.map((item, i) => (
          <li key={i} className={styles.item}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
