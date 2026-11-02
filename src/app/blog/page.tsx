import type { Metadata } from "next";
import { Suspense } from "react";
import BlogFilters from "@/components/BlogFilters";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import { blogFiltersToParams, blogFiltersToQuery, parseBlogParams } from "@/lib/blog";
import type { SearchParams } from "@/lib/catalog";
import { getPosts } from "@/lib/data";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, gifting ideas and the craft behind every sweet.",
};

async function Posts({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseBlogParams(await searchParams);
  const posts = await getPosts(blogFiltersToQuery(filters));

  return (
    <>
      <BlogFilters filters={filters} />
      {posts.data.length === 0 ? (
        <p className={styles.empty}>No stories found. Check back soon.</p>
      ) : (
        <ul className={styles.grid}>
          {posts.data.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
      <Pagination meta={posts.meta} basePath="/blog" params={blogFiltersToParams(filters)} />
    </>
  );
}

export default function BlogPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <>
      <PageHeader
        eyebrow="The journal"
        title={
          <>
            Stories worth <em>sharing.</em>
          </>
        }
        description="Gifting ideas, festive guides and the craft behind every sweet."
      />
      <div className="container pageBody">
        <Suspense fallback={<div className={styles.loading} aria-hidden="true" />}>
          <Posts searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
