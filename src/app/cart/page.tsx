import type { Metadata } from "next";
import CartView from "@/components/CartView";
import PageHeader from "@/components/PageHeader";
import Title from "@/components/Title";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Your cart" };

export default async function CartPage() {
  const s = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow={s.cart_hero_eyebrow}
        title={<Title text={s.cart_hero_title} accent={s.cart_hero_title_accent} inline />}
      />
      <div className="container pageBody" style={{ paddingTop: 48 }}>
        <CartView
          emptyMessage={s.cart_empty_message}
          emptyButtonText={s.cart_empty_button_text}
        />
      </div>
    </>
  );
}
