import AnnouncementBar from "@/components/AnnouncementBar";
import Collections from "@/components/Collections";
import Festive from "@/components/Festive";
import Gifting from "@/components/Gifting";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductCollection from "@/components/ProductCollection";
import Signature from "@/components/Signature";
import Story from "@/components/Story";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Collections />
        <Signature />
        <Gifting />
        <Festive />
        <Story />
        <ProductCollection />
      </main>
    </>
  );
}
