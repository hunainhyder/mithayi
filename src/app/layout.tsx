import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSettings } from "@/lib/data";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: {
      default: s.site_title,
      template: `%s | ${s.site_title_template_suffix}`,
    },
    description: s.site_description,
    ...(s.site_favicon && { icons: { icon: s.site_favicon } }),
    ...(s.site_share_image && { openGraph: { images: [s.site_share_image] } }),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <AnnouncementBar />
        <Header />
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
