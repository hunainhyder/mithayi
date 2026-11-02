"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { BagIcon } from "./Icons";
import styles from "./Header.module.css";

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link href="/cart" className={styles.iconButton} aria-label={`Cart, ${count} items`}>
      <BagIcon size={18} />
      <span className={styles.count}>{count}</span>
    </Link>
  );
}
