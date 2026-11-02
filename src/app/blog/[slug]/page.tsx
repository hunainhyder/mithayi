import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { ArrowLeftIcon } from "@/components/Icons";
import styles from "./post.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Story not found" };
  return { title: post.title, description: post.excerpt ?? undefined };
}

async function Article({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article className={styles.article}>
      <div className={`container ${styles.head}`}>
        <Link href="/blog" className={styles.back}>
          <ArrowLeftIcon size={14} /> All stories
        </Link>
        <p className={styles.meta}>
          {post.published_at && (
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          )}
          <span>{post.reading_time} min read</span>
        </p>
        <h1 className="section-title">{post.title}</h1>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
      </div>

      {post.featured_image && (
        <div className={`container ${styles.cover}`}>
          <Image
            src={post.featured_image.url}
            alt=""
            fill
            priority
            sizes="(max-width: 1000px) 100vw, 1000px"
            className={styles.image}
          />
        </div>
      )}

      {/* Post content is authored in the CMS as HTML */}
      <div className={`container ${styles.content}`} dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export default function PostPage(props: Props) {
  return (
    <Suspense fallback={<div style={{ minHeight: "70vh" }} aria-hidden="true" />}>
      <Article {...props} />
    </Suspense>
  );
}
