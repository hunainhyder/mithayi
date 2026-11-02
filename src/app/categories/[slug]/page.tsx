import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CatalogFilters from "@/components/CatalogFilters";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import ProductGrid, { ProductGridSkeleton } from "@/components/ProductGrid";
import {
  filtersToParams,
  filtersToCategoryProductQuery,
  parseCatalogParams,
  type SearchParams,
} from "@/lib/catalog";
import { getCategoryProducts } from "@/lib/data";

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
  const data = await getCategoryProducts(slug, filtersToCategoryProductQuery(filters));

  if (!data) notFound();

  const { category } = data;

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title={category.name}
        description={category.description}
        image={category.secondary_image ?? category.image}
      />
      <div className="container pageBody">
        <CatalogFilters action={`/categories/${category.slug}`} filters={filters} />
        <p className="resultCount">
          {data.meta.total} {data.meta.total === 1 ? "treat" : "treats"}
        </p>
        <ProductGrid products={data.data} />
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
