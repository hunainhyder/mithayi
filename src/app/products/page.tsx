import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogFilters from "@/components/CatalogFilters";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import ProductGrid, { ProductGridSkeleton } from "@/components/ProductGrid";
import {
  filtersToParams,
  filtersToProductQuery,
  parseCatalogParams,
  type SearchParams,
} from "@/lib/catalog";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Shop" };

async function Catalog({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseCatalogParams(await searchParams);
  const [products, categories] = await Promise.all([
    getProducts(filtersToProductQuery(filters)),
    getCategories({ sort: "alpha_asc", per_page: 100 }),
  ]);

  return (
    <>
      <CatalogFilters action="/products" filters={filters} categories={categories.data} />
      <p className="resultCount">
        {products.meta.total} {products.meta.total === 1 ? "treat" : "treats"}
      </p>
      <ProductGrid products={products.data} />
      <Pagination
        meta={products.meta}
        basePath="/products"
        params={filtersToParams(filters)}
      />
    </>
  );
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <PageHeader
        eyebrow="The full collection"
        title={
          <>
            Shop <em>everything sweet.</em>
          </>
        }
        description="Mithai, gift boxes, hampers and more. Find the right one for the moment."
      />
      <div className="container pageBody">
        <Suspense fallback={<ProductGridSkeleton />}>
          <Catalog searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
