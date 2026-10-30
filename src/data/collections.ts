import type { Collection } from "@/types";

export const collections: Collection[] = [
  { id: "mithai", name: "Mithai", href: "#favourites", image: "/images/collection-mithai.jpg" },
  { id: "gift-boxes", name: "Gift Boxes", href: "#gifting", image: "/images/collection-gift-boxes.jpg" },
  { id: "gift-hampers", name: "Gift Hampers", href: "#gifting", image: "/images/collection-gift-hampers.jpg" },
  { id: "chocolates", name: "Chocolates", href: "#favourites", image: "/images/collection-chocolates.jpg" },
  { id: "festive-gifts", name: "Festive Gifts", href: "#festive", image: "/images/collection-festive-gifts.jpg" },
  { id: "corporate-gifts", name: "Corporate Gifts", href: "#gifting", image: "/images/collection-gift-hampers.jpg" },
];

export const collectionFilters = ["All", ...collections.map((c) => c.name)];
