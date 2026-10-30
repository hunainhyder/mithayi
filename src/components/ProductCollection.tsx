import Link from "next/link";
import { collectionFilters } from "@/data/collections";
import { products } from "@/data/products";
import { ArrowRightIcon } from "./Icons";
import ProductCard from "./ProductCard";
import styles from "./ProductCollection.module.css";

const activeFilter = "Mithai";

export default function ProductCollection() {
  return (
    <section id="favourites" className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className="eyebrow">Loved for a reason</p>
            <h2 className="section-title">
              Mithai <em>collection.</em>
            </h2>
          </div>
          <Link href="#favourites" className={styles.viewAll}>
            View all favourites <ArrowRightIcon size={14} />
          </Link>
        </header>

        <ul className={styles.filters}>
          {collectionFilters.map((filter) => (
            <li key={filter}>
              <span
                className={`${styles.chip} ${filter === activeFilter ? styles.active : ""}`}
              >
                {filter}
              </span>
            </li>
          ))}
        </ul>

        <ul className={styles.grid}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
