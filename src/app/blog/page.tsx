import type { Metadata } from "next";
import { Suspense } from "react";
import BlogFilters from "@/components/BlogFilters";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import Title from "@/components/Title";
import { blogFiltersToParams, blogFiltersToQuery, parseBlogParams } from "@/lib/blog";
import type { SearchParams } from "@/lib/catalog";
import { getPosts, getSettings } from "@/lib/data";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, gifting ideas and the craft behind every sweet.",
};

async function Posts({
  searchParams,
  emptyMessage,
}: {
  searchParams: Promise<SearchParams>;
  emptyMessage: string;
}) {
  const filters = parseBlogParams(await searchParams);
  const posts = await getPosts(blogFiltersToQuery(filters));

  return (
    <>
      <BlogFilters filters={filters} />
      {posts.data.length === 0 ? (
        <p className={styles.empty}>{emptyMessage}</p>
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const s = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow={s.blog_hero_eyebrow}
        title={<Title text={s.blog_hero_title} accent={s.blog_hero_title_accent} inline />}
        description={s.blog_hero_description}
        image={s.blog_hero_image}
      />
      <div className="container pageBody">
        <Suspense fallback={<div className={styles.loading} aria-hidden="true" />}>
          <Posts searchParams={searchParams} emptyMessage={s.blog_empty_message} />
        </Suspense>
      </div>
    </>
  );
}
