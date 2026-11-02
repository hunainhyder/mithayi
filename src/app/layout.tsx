import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

export const metadata: Metadata = {
  title: {
    default: "Mithayi | Thoughtfully crafted mithai & gifts",
    template: "%s | Mithayi",
  },
  description:
    "Thoughtfully crafted mithai and gifts, made for every beautiful moment worth celebrating.",
};

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
