import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import { ArrowRightIcon } from "./Icons";
import styles from "./Collections.module.css";

export default async function Collections() {
  const { data: categories } = await getCategories({
    sort: "newest",
    per_page: 6,
  });

  if (categories.length === 0) return null;

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
                  {String(i + 1).padStart(2, "0")} / Collection
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
