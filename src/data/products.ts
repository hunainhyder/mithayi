import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "royal-mithai-box",
    name: "The Royal Mithai Box",
    blurb: "A little bit of everything wonderful",
    price: 3850,
    rating: 4.9,
    category: "Mithai",
    badge: "Best Seller",
    image: "/images/hero.jpg",
  },
  {
    id: "pistachio-rose-selection",
    name: "Pistachio & Rose Selection",
    blurb: "Handcrafted with love and tradition",
    price: 2950,
    rating: 4.9,
    category: "Mithai",
    badge: "Signature",
    image: "/images/signature.jpg",
  },
];
