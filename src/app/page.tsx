import AnnouncementBar from "@/components/AnnouncementBar";
import Collections from "@/components/Collections";
import Festive from "@/components/Festive";
import Footer from "@/components/Footer";
import Gifting from "@/components/Gifting";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InstagramFeed from "@/components/InstagramFeed";
import Marquee from "@/components/Marquee";
import Occasions from "@/components/Occasions";
import ProductCollection from "@/components/ProductCollection";
import Signature from "@/components/Signature";
import Story from "@/components/Story";
import Testimonial from "@/components/Testimonial";

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
        <Occasions />
        <Testimonial />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  );
}
