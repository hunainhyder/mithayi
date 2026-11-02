import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Post } from "@/types/api";
import styles from "./PostCard.module.css";

// Lists show only the summary fields; the full HTML content is left for the post page.
export default function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className={styles.card}>
        <div className={styles.thumb}>
          {post.featured_image && (
            <Image
              src={post.featured_image.url}
              alt=""
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 420px"
              className={styles.image}
            />
          )}
        </div>
        <p className={styles.meta}>
          {post.published_at && (
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          )}
          <span>{post.reading_time} min read</span>
        </p>
        <h2 className={styles.title}>{post.title}</h2>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
      </Link>
    </article>
  );
}
