import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import PageHeader from "@/components/PageHeader";
import Title from "@/components/Title";
import { getSettings } from "@/lib/data";
import { getShippingMethods } from "@/lib/settings";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const s = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow={s.checkout_hero_eyebrow}
        title={<Title text={s.checkout_hero_title} accent={s.checkout_hero_title_accent} inline />}
      />
      <div className="container pageBody" style={{ paddingTop: 48 }}>
        <CheckoutForm
          shippingMethods={getShippingMethods(s)}
          copy={{
            emptyMessage: s.cart_empty_message,
            emptyButtonText: s.cart_empty_button_text,
            successEyebrow: s.order_success_eyebrow,
            successTitle: s.order_success_title,
            successTitleAccent: s.order_success_title_accent,
            successMessage: s.order_success_message,
          }}
        />
      </div>
    </>
  );
}
