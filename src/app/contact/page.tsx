import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHeader from "@/components/PageHeader";
import Title from "@/components/Title";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about an order, a gift or a celebration? Send us a note.",
};

export default async function ContactPage() {
  const s = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow={s.contact_hero_eyebrow}
        title={<Title text={s.contact_hero_title} accent={s.contact_hero_title_accent} inline />}
        description={s.contact_hero_description}
        image={s.contact_hero_image}
      />
      <div className="container pageBody" style={{ maxWidth: 760, paddingTop: 48 }}>
        <EnquiryForm
          submitText={s.contact_form_submit_text}
          successMessage={s.contact_form_success_message}
        />
      </div>
    </>
  );
}
