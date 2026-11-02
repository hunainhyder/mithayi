import type { Metadata } from "next";
import CartView from "@/components/CartView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Your cart" };

export default function CartPage() {
  return (
    <>
      <PageHeader eyebrow="Almost yours" title={<>Your <em>cart.</em></>} />
      <div className="container pageBody" style={{ paddingTop: 48 }}>
        <CartView />
      </div>
    </>
  );
}
