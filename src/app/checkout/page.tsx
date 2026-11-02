import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader eyebrow="Nearly there" title={<>Complete your <em>order.</em></>} />
      <div className="container pageBody" style={{ paddingTop: 48 }}>
        <CheckoutForm />
      </div>
    </>
  );
}
