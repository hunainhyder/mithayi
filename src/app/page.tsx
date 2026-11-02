import { Suspense } from "react";
import Collections from "@/components/Collections";
import Festive from "@/components/Festive";
import Gifting from "@/components/Gifting";
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
      <Hero />
      <Marquee />
      <Suspense>
        <Collections />
      </Suspense>
      <Signature />
      <Gifting />
      <Festive />
      <Story />
      <Suspense>
        <ProductCollection />
      </Suspense>
      <Occasions />
      <Testimonial />
      <InstagramFeed />
    </>
  );
}
