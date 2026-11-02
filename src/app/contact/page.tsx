import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about an order, a gift or a celebration? Send us a note.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title={
          <>
            We&rsquo;d love to <em>hear from you.</em>
          </>
        }
        description="Questions about an order, a gift or a celebration? Send us a note and we will get back to you."
      />
      <div className="container pageBody" style={{ maxWidth: 760, paddingTop: 48 }}>
        <EnquiryForm />
      </div>
    </>
  );
}
