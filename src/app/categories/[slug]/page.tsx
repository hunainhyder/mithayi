import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CatalogFilters from "@/components/CatalogFilters";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import ProductGrid, { ProductGridSkeleton } from "@/components/ProductGrid";
import SubcategoryNav from "@/components/SubcategoryNav";
import {
  filtersToParams,
  filtersToCategoryProductQuery,
  parseCatalogParams,
  type SearchParams,
} from "@/lib/catalog";
import { findFamily } from "@/lib/categories";
import { getCategoryProducts, getCategoryTree } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryProducts(slug, { per_page: 1 });
  return { title: data?.category.name ?? "Collection" };
}

async function CategoryContent({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const filters = parseCatalogParams(query);
  const [data, tree] = await Promise.all([
    getCategoryProducts(slug, filtersToCategoryProductQuery(filters)),
    getCategoryTree(),
  ]);

  if (!data) notFound();

  const { category } = data;
  const family = findFamily(tree, category.slug);
  const isParent = family?.slug === category.slug && family.children.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={family && family.slug !== category.slug ? family.name : "Collection"}
        title={category.name}
        description={category.description}
        image={category.secondary_image ?? category.image}
      />
      <div className="container pageBody">
        {family && <SubcategoryNav family={family} activeSlug={category.slug} />}
        <CatalogFilters action={`/categories/${category.slug}`} filters={filters} />
        <p className="resultCount">
          {data.meta.total} {data.meta.total === 1 ? "treat" : "treats"}
        </p>
        <ProductGrid
          products={data.data}
          emptyMessage={
            isParent
              ? "Pick a sub-category above to start browsing."
              : undefined
          }
        />
        <Pagination
          meta={data.meta}
          basePath={`/categories/${category.slug}`}
          params={filtersToParams(filters)}
        />
      </div>
    </>
  );
}

export default function CategoryPage(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="container pageBody">
          <ProductGridSkeleton />
        </div>
      }
    >
      <CategoryContent {...props} />
    </Suspense>
  );
}
