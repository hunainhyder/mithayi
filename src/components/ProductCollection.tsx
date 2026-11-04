import Link from "next/link";
import { getCategoryTree, getFeaturedProducts, getSettings } from "@/lib/data";
import { ArrowRightIcon } from "./Icons";
import ProductCard from "./ProductCard";
import Title from "./Title";
import styles from "./ProductCollection.module.css";

export default async function ProductCollection() {
  const [products, tree, s] = await Promise.all([
    getFeaturedProducts(),
    getCategoryTree(),
    getSettings(),
  ]);
  const categories = tree.slice(0, 8);

  if (products.length === 0) return null;

  return (
    <section id="favourites" className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className="eyebrow">{s.favourites_eyebrow}</p>
            <h2 className="section-title">
              <Title text={s.favourites_title} accent={s.favourites_title_accent} inline />
            </h2>
            {s.favourites_description && <p>{s.favourites_description}</p>}
          </div>
          {s.favourites_button_text && (
            <Link href="/products" className={styles.viewAll}>
              {s.favourites_button_text} <ArrowRightIcon size={14} />
            </Link>
          )}
        </header>

        <ul className={styles.filters}>
          <li>
            <Link href="/products" className={`${styles.chip} ${styles.active}`}>
              All
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/${category.slug}`} className={styles.chip}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className={styles.grid}>
          {products.slice(0, 8).map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
