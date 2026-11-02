import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string | null;
  /** Absolute image URL shown as a banner behind the heading */
  image?: string | null;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
}: PageHeaderProps) {
  return (
    <header className={`${styles.header} ${image ? styles.withImage : ""}`}>
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className={styles.image} />
          <div className={styles.overlay} />
        </>
      )}
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title">{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </header>
  );
}
