import Image from "next/image";
import Link from "next/link";
import { getCategoryTree, getSettings } from "@/lib/data";
import { ArrowRightIcon } from "./Icons";
import Title from "./Title";
import styles from "./Collections.module.css";

export default async function Collections() {
  const [tree, s] = await Promise.all([getCategoryTree(), getSettings()]);
  // Top-level categories only; sub-categories are reached through their parent
  const categories = tree.slice(0, 6);

  if (categories.length === 0) return null;

  return (
    <section id="collections" className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">{s.collections_eyebrow}</p>
          <h2 className="section-title">
            <Title text={s.collections_title} accent={s.collections_title_accent} inline />
          </h2>
          <p className={styles.sub}>{s.collections_description}</p>
        </header>

        <ul className={styles.grid}>
          {categories.map((category, i) => (
            <li key={category.id}>
              <Link href={`/categories/${category.slug}`} className={styles.card}>
                <div className={styles.thumb}>
                  {category.image && (
                    <Image
                      src={category.image.url}
                      alt={category.name}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 220px"
                      className={styles.image}
                    />
                  )}
                </div>
                <span className={styles.index}>
                  {String(i + 1).padStart(2, "0")} / {s.collections_card_label}
                </span>
                <span className={styles.name}>
                  {category.name}
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
