import AnnouncementBar from "@/components/AnnouncementBar";
import Collections from "@/components/Collections";
import Gifting from "@/components/Gifting";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Signature from "@/components/Signature";

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
      </main>
    </>
  );
}
