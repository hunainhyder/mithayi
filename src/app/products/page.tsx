import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogFilters from "@/components/CatalogFilters";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import ProductGrid, { ProductGridSkeleton } from "@/components/ProductGrid";
import Title from "@/components/Title";
import {
  filtersToParams,
  filtersToProductQuery,
  parseCatalogParams,
  type SearchParams,
} from "@/lib/catalog";
import { getCategories, getProducts, getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Shop" };

async function Catalog({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseCatalogParams(await searchParams);
  const [products, categories, s] = await Promise.all([
    getProducts(filtersToProductQuery(filters)),
    getCategories({ sort: "alpha_asc", per_page: 100 }),
    getSettings(),
  ]);

  return (
    <>
      <CatalogFilters action="/products" filters={filters} categories={categories.data} />
      <p className="resultCount">
        {products.meta.total}{" "}
        {products.meta.total === 1 ? s.shop_result_singular : s.shop_result_plural}
      </p>
      <ProductGrid products={products.data} emptyMessage={s.shop_empty_message} />
      <Pagination
        meta={products.meta}
        basePath="/products"
        params={filtersToParams(filters)}
      />
    </>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const s = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow={s.shop_hero_eyebrow}
        title={<Title text={s.shop_hero_title} accent={s.shop_hero_title_accent} inline />}
        description={s.shop_hero_description}
        image={s.shop_hero_image}
      />
      <div className="container pageBody">
        <Suspense fallback={<ProductGridSkeleton />}>
          <Catalog searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
