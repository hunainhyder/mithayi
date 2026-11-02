import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductPurchase from "@/components/ProductPurchase";
import ProductReviews from "@/components/ProductReviews";
import { toPlainText } from "@/lib/format";
import { getProduct } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: toPlainText(product.description, 160),
  };
}

async function ProductContent({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <>
      <div className="container" style={{ paddingBlock: "48px 72px" }}>
        <ProductPurchase product={product} />
      </div>
      <ProductReviews product={product} />
    </>
  );
}

export default function ProductPage(props: Props) {
  return (
    <Suspense fallback={<div style={{ minHeight: "70vh" }} aria-hidden="true" />}>
      <ProductContent {...props} />
    </Suspense>
  );
}
