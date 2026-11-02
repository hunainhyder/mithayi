import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import { getFaqs } from "@/lib/data";
import styles from "./faqs.module.css";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about ordering, gifting and delivery.",
};

async function FaqList() {
  const faqs = (await getFaqs())
    .filter((faq) => faq.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  if (faqs.length === 0) {
    return <p className={styles.empty}>No questions yet. Ask us anything on the contact page.</p>;
  }

  return (
    <div className={styles.list}>
      {faqs.map((faq) => (
        <details key={faq.id} className={styles.item}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Good to know"
        title={
          <>
            Frequently asked <em>questions.</em>
          </>
        }
      />
      <div className={`container pageBody ${styles.wrap}`}>
        <Suspense fallback={<div className={styles.loading} aria-hidden="true" />}>
          <FaqList />
        </Suspense>
        <p className={styles.more}>
          Still wondering? <Link href="/contact">Get in touch</Link>.
        </p>
      </div>
    </>
  );
}
