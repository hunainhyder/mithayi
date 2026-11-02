import Link from "next/link";
import { getCategories, getFeaturedProducts } from "@/lib/data";
import { ArrowRightIcon } from "./Icons";
import ProductCard from "./ProductCard";
import styles from "./ProductCollection.module.css";

export default async function ProductCollection() {
  const [products, { data: categories }] = await Promise.all([
    getFeaturedProducts(),
    getCategories({ sort: "most_products", per_page: 8 }),
  ]);

  if (products.length === 0) return null;

  return (
    <section id="favourites" className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className="eyebrow">Loved for a reason</p>
            <h2 className="section-title">
              Our <em>favourites.</em>
            </h2>
          </div>
          <Link href="/products" className={styles.viewAll}>
            View all favourites <ArrowRightIcon size={14} />
          </Link>
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
