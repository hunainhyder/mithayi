import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import Title from "@/components/Title";
import { getFaqs, getSettings } from "@/lib/data";
import styles from "./faqs.module.css";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about ordering, gifting and delivery.",
};

async function FaqList({ emptyMessage }: { emptyMessage: string }) {
  const faqs = (await getFaqs())
    .filter((faq) => faq.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  if (faqs.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
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

export default async function FaqsPage() {
  const s = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow={s.faqs_hero_eyebrow}
        title={<Title text={s.faqs_hero_title} accent={s.faqs_hero_title_accent} inline />}
        description={s.faqs_hero_description}
        image={s.faqs_hero_image}
      />
      <div className={`container pageBody ${styles.wrap}`}>
        <Suspense fallback={<div className={styles.loading} aria-hidden="true" />}>
          <FaqList emptyMessage={s.faqs_empty_message} />
        </Suspense>
        <p className={styles.more}>
          {s.faqs_footer_text} <Link href="/contact">{s.faqs_footer_link_text}</Link>.
        </p>
      </div>
    </>
  );
}
